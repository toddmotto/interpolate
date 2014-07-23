/*! interpolate.js v1.1.1 | (c) 2014 @toddmotto | https://github.com/toddmotto/interpolate */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.interpolate = factory();
  }
})(this, function () {
  /**
   * @desc Match content between delimiters
   * @type {RegExp}
   */
  var getDelimiters = /{{\s*(.+?)\s*}}/g;

  /**
   * @desc Parses an template and generates a new function
   * @returns {Function} function that takes an object as argument and returns a string
   */
  return function (tmpl) {
    var code = 'with(obj){return \'' +  tmpl.replace(getDelimiters, '\'+($1)+\'') + '\';}';
    return new Function('obj', code);
  };
});
