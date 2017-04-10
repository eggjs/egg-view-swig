'use strict';
module.exports = () => {
  const config = {};

  config.keys = '123456';
  /**
   * swig View options
   * @property {String|Object|Function} manifest 资源依赖表
   * @property {Boolean} [cache] 是否缓存 如果是则为内存缓存
   * @property {String} [ext] 模板后缀名
   */
  config.security = {
    csp: {
      enable: true,
    },
  };

  config.view = {
    defaultViewEngine: 'swig',
    mapping: {
      '.html': 'swig',
    },
  };

  return config;
};
