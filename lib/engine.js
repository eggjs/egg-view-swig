'use strict';
const swig = require('swig');
const utils = require('./utils');
const FileLoader = require('./loader');

module.exports = app => {
  const viewRoot = utils.resolveRoot(app);
  const opts = Object.assign({ loader: new FileLoader(app, viewRoot) }, app.config.swig);
  opts.cache = app.config.swig.cache === true ? 'memory' : false;
  swig.setDefaults(opts);
  swig.viewRoot = viewRoot;
  return swig;
};

