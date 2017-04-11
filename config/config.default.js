'use strict';

module.exports = () => {
  const config = {};

  /**
   * swig View options
   * @property {Boolean} [cache] template cache. if true: memory cache  false: no cache
   *
   */
  config.swig = {
    cache: true,
  };

  return config;
};
