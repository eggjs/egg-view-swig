'use strict';
const swig = require('swig');

module.exports = app => {
  const opts = Object.assign({}, app.config.swig);
  opts.cache = app.config.swig.cache === true ? 'memory' : false;
  swig.setDefaults(opts);
  return swig;
};

