# egg-view-swig

Use [swig](http://paularmstrong.github.io/swig/) Template Engine

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
  cache: true
};
```

Render in controller

```js
// {app_root}/app/controller/test.js
exports.home = function* () {
  yield this.render('home.tpl', { name: 'swig view' });
};
```
## Configuration

see [config/config.default.js](config/config.default.js) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)