'use strict';
const swig = require('swig');
const FileLoader = require('./loader');

module.exports = app => {
  const viewRoot = app.config.view.root[0];
  const opts = Object.assign({ loader: new FileLoader(app, viewRoot) }, app.config.swig);
  opts.cache = app.config.swig.cache === true ? 'memory' : false;
  swig.setDefaults(opts);
  swig.viewRoot = viewRoot;
  return swig;
};

