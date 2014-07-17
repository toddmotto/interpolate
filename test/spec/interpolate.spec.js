/* globals describe, beforeEach, interpolate, it, expect */

/**
 * interpolate.js
 */
describe('interpolate', function () {

  var render, done;

  // make a few of the {{ }} have inconsistent whitespacing
  // to test the RegExp replacement
  // if the test passes below, we win
  var template = [
    '<li data-location="{{location }}">',
      '{{ name}}',
      '<span data-age="{{ age }}">{{ age }}</span>',
    '</li>'
  ].join('');

  var data = {
    name: 'Todd Motto',
    age: 23,
    location: 'United Kingdom',
    favourite : {
      language : 'JavaScript',
      framework : 'AngularJS'
    }
  };

  beforeEach(function () {
    render = interpolate(template);
    done = render(data);
  });

  // this also checks the persistance of global replace not just single
  it('should map Object properties against the handlebar templates globally', function () {
    expect(done).toMatch('<li data-location="United Kingdom">Todd Motto<span data-age="23">23</span></li>');
  });

  it('should handle deep property interpolation', function() {
    var render = interpolate('{{ favourite.language }} - {{ favourite.framework }}');
    expect(render(data)).toMatch('JavaScript - AngularJS');
  });

  it('should throw an error if `path` can\'t be extracted', function(){
      var render = interpolate('{{ favourite["test"]["test"] }}');
      expect(function(){ render(data); }).toThrow(new Error('Can\'t extract \'favourite["test"]["test"]\' from supplied object.'));
  });

  it('should allow function call in the template', function() {
    var render = interpolate('Author: {{ fullName() }}.');
    var data = {
      firstName: 'Todd',
      lastName: 'Motto',
      fullName: function() {
        return this.firstName + ' ' + this.lastName;
      }
    };
    expect(render(data)).toMatch('Author: Todd Motto.');
  });

  it('should allow complex javascript', function() {
    var render = interpolate('Author: {{ age > 30 ? fullName() : fullName().toUpperCase() }}.');
    var data = {
      age: 23,
      firstName: 'Todd',
      lastName: 'Motto',
      fullName: function() {
        return this.firstName + ' ' + this.lastName;
      }
    };
    expect(render(data)).toMatch('Author: TODD MOTTO.');
  });

});
