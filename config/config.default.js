'use strict';

module.exports = () => {
  const config = {};

  /**
   * swig View options
   * @property {Boolean} [cache] 是否缓存 如果是则为内存缓存
   */
  config.swig = {
    cache: true,
  };

  return config;
};
