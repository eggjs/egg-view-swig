'use strict';

class SwigView {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
  }

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

  renderString(tpl, locals, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        options.locals = locals;
        resolve(this.app.swig.render(tpl, options));
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = SwigView;
