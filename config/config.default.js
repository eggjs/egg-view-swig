'use strict';

module.exports = () => {
  const config = {};

  /**
   * swig View options
   * @property {Boolean} [cache] template cache. Default to `true` at no-local env, will use memory cache.
   * @see http://node-swig.github.io/swig-templates/docs/api/#SwigOpts
   */
  config.swig = {
    cache: true,
  };

  return config;
};
