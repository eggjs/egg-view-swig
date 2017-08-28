# egg-view-swig

Use [swig](https://github.com/paularmstrong/swig) Template Engine.

**NOTE: swig is NOT MAINTAINED.**

Docs: http://node-swig.github.io/swig-templates


## Install

```bash
$ npm i egg-view-swig --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.swig = {
  enable: true,
  package: 'egg-view-swig',
};
```

Set mapping in config

```js
// {app_root}/config/config.default.js
exports.view = {
  defaultViewEngine: 'swig',
  mapping: {
    '.tpl': 'swig',
  },
};

// {app_root}/config/config.default.js
exports.swig = {
  cache: true,
};
```

Set filter
```javascript
// {app_root}/app/extend/filter.js
exports.hello = name => `hi, ${name}.`;   

// {app_root}/app/controller/{your_controller}.js
exports.home = function* (ctx) {
  yield ctx.render('home.tpl', { name: 'egg' });
};

// home.tpl
{{ name | hello }}
```

Render in controller

```js
// {app_root}/app/controller/test.js
exports.home = function* (ctx) {
  yield ctx.render('home.tpl', { name: 'swig view' });
};
```

## Configuration

see [config/config.default.js](config/config.default.js) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)