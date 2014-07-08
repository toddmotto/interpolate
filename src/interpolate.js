(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.interpolate = factory();
  }
})(this, function () {

  'use strict';

  /**
   * Interpolate
   * @class
   * @classdesc Interpolates a String against an Object's values
   * @param {String} tmpl Template to store for parsing
   */
  function Interpolate (tmpl) {
    if (getType(tmpl) !== 'String') return;
    this.template = strip(tmpl);
  }

  /**
   * Regular expression to match delimeters in templates
   * @type {RegExp}
   */
  Interpolate.reDelimeters = /{{([a-zA-Z0-9\.-_]+)}}/g;

  /**
   * @name Interpolate#parse
   * @desc Parses an Object's values against the stored String template
   * @returns {String} Parsed template
   */
  Interpolate.prototype.parse = function (obj) {
    if (getType(obj) !== 'Object') return;
    var temp = this.template;
    return temp.replace(Interpolate.reDelimeters, function(str, path) {
      return followPath(obj, path);
    });
  };

  /**
   * @name getType
   * @description Returns the Object's type
   * @param {Object} item The item to get the type
   * @returns {String}
   * @private
   */
  function getType (item) {
    return Object.prototype.toString.call(item).slice(8, -1);
  }

  /**
   * @name strip
   * @param {string} tmpl Template for removing whitespace between handlebars
   * @private
   * @returns {String}
   */
  function strip (tmpl) {
    return tmpl.replace(/\s(?![^}}]*\{\{)/g, '');
  }

  /**
   * follows a path on the given data to retrieve a value
   *
   * @example
   * var data = { foo : { bar : "abc" } };
   * followPath(data, "foo.bar"); // "abc"
   * 
   * @param  {Object} data the object to get a value from
   * @param  {String} path a path to a value on the data object
   * @return the value of following the path on the data object
   */
  function followPath(data, path) {
    return path.split('.').reduce(function(prev, curr) {
      return prev && prev[curr];
    }, data);
  }

  return function (tmpl) {
    var template = new Interpolate(tmpl);
    return function (obj) {
      return template.parse(obj);
    };
  };

});
