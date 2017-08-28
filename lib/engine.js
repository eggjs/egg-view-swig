'use strict';
const path = require('path');
const swig = require('swig');
const FileLoader = require('./loader');

module.exports = app => {
  const opts = Object.assign({}, app.config.swig);
  const loadFilter = () => {
    const loaded = Object.keys(require('swig/lib/filters.js'));

    for (const unit of app.loader.getLoadUnits()) {
      const filterPath = path.join(unit.path, 'app/extend/filter.js');
      const filters = app.loader.loadFile(filterPath) || {};

      for (const key of Object.keys(filters)) {
        if (!loaded.includes(key)) {
          swig.setFilter(key, filters[key]);
          loaded.push(key);
        }
      }
    }
  };

  opts.loader = new FileLoader(app);
  opts.cache = app.config.swig.cache === true ? 'memory' : false;
  swig.setDefaults(opts);
  loadFilter();

  return swig;
};

