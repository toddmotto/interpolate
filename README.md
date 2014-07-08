# interpolate.js [![Build Status](https://travis-ci.org/toddmotto/interpolate.svg)](https://travis-ci.org/toddmotto/interpolate)

Micro templating engine module weighing &lt;1KB, maps `Object` property values to a handlebar templated `String`. Returns a `closure` which calls a unique `Object` as single argument against the cached template. Doesn't compile to DOM nodes, merely interpolates to `String`, if you want to compile to live DOM [use this additional function](http://jsfiddle.net/toddmotto/2QZz4).

> [Live demo](http://jsfiddle.net/toddmotto/F4k2F)

```javascript
var template = [
  '<li data-location="{{ location }}">',
    '{{ name }}',
    '<span>{{ age }}</span>',
  '</li>'
].join('');

var data = {
  name: 'Todd Motto',
  age: 23,
  location: 'United Kingdom'
};

// <li data-location="United Kingdom">Todd Motto<span>23</span></li>
interpolate(template)(data);
```

The initial `interpolate()` call caches the template internally, further calls will reference this template whilst mapping Object values:

```javascript
var template = [
  '<li data-location="{{ location }}">',
    '{{ name }}',
    '<span>{{ age }}</span>',
  '</li>'
].join('');

var data = [{
  name: 'Todd Motto',
  age: 23,
  location: 'United Kingdom'
},{
  name: 'Travis Barker',
  age: 38,
  location: 'United States'
}];

var render = interpolate(template);
for (var i = 0; i < data.length; i++) {
  // iterated Objects called against same template
  var done = render(data[i]);
  // 0: <li data-location="United Kingdom">Todd Motto<span>23</span></li>
  // 1: <li data-location="United States">Travis Barker<span>38</span></li>
  console.log(done);
}
```

Support for deep Object properties is also there:

```javascript
var template = [
  '<span>',
    '{{ favourite.language }}',
  '</span>'
].join('');

var data = {
  favourite: {
    language: 'JavaScript'
  }
}

var render = interpolate(template);
console.log(render(data)); // <span>JavaScript</span>
```

## Installing with Bower

```
bower install https://github.com/toddmotto/interpolate.git
```

## Manual installation
Ensure you're using the files from the `dist` directory (contains compiled production-ready code). Ensure you place the script before the closing `</body>` tag.

```html
<body>
  <!-- html above -->
  <script src="dist/interpolate.js"></script>
  <script>
  // interpolate module available
  </script>
</body>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using Gulp.

## Release history

- 1.1.0
  - Add support for deep Object properties
- 1.0.0
  - Initial release
