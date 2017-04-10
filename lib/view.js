'use strict';

class SwigView {
  constructor(ctx) {
    this.app = ctx.app;
  }

  /**
   * 渲染页面模板，返回渲染后的字符串
   * @method View#render
   * @param {String} name 组件名
   * @param {Object} [locals] 需要放到页面上的变量
   * @return {Promise} 渲染后的字符串.
   * @protected
   */
  render(name, locals) {
    return new Promise((resolve, reject) => {
      this.app.swig.renderFile(name, locals, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * 渲染模板字符串
   * @method View#renderString
   * @param {String} tpl 模板字符串
   * @param {Object} [locals] 需要放到页面上的变量
   * @return {Promise} 渲染后的字符串
   * @protected
   */
  renderString(tpl, locals) {
    return Promise.resolve(this.app.swig.render(tpl, { locals }));
  }
}

module.exports = SwigView;
