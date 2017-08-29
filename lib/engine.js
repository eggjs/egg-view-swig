'use strict';
const path = require('path');
const swig = require('swig');
const FileLoader = require('./loader');

module.exports = app => {
  const opts = Object.assign({}, app.config.swig);
  const loadFilter = () => {
    for (const unit of app.loader.getLoadUnits()) {
      const filterPath = path.join(unit.path, 'app/extend/filter.js');
      const filters = app.loader.loadFile(filterPath) || {};

      for (const key of Object.keys(filters)) {
        swig.setFilter(key, filters[key]);
      }
    }
  };

  opts.loader = new FileLoader(app);
  opts.cache = app.config.swig.cache === true ? 'memory' : false;
  swig.setDefaults(opts);
  loadFilter();

  return swig;
};

