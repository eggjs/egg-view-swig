'use strict';

const path = require('path');
const swig = require('swig');
const FileLoader = require('./loader');

module.exports = app => {
  const opts = Object.assign({}, app.config.swig);
  opts.loader = new FileLoader(app);
  opts.cache = app.config.swig.cache === true ? 'memory' : false;
  swig.setDefaults(opts);

  // load `app/extend/filter.js`
  const filterPath = path.join(app.config.baseDir, 'app/extend/filter.js');
  const filters = app.loader.loadFile(filterPath) || {};

  for (const key of Object.keys(filters)) {
    swig.setFilter(key, filters[key]);
  }

  return swig;
};

