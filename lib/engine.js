'use strict';
const swig = require('swig');
const FileLoader = require('./loader');

module.exports = app => {
  const opts = Object.assign({}, app.config.swig);
  opts.loader = new FileLoader(app);
  opts.cache = app.config.swig.cache === true ? 'memory' : false;
  swig.setDefaults(opts);
  return swig;
};

