'use strict';

const SWIG_VIEW_ENGINE = Symbol('app#SwigViewEngine');
const engine = require('../../lib/engine');

module.exports = {

  /**
   * swig view engine
   * @member {Object} Application#swig
   */
  get swig() {
    if (!this[SWIG_VIEW_ENGINE]) {
      this[SWIG_VIEW_ENGINE] = engine(this);
    }
    return this[SWIG_VIEW_ENGINE];
  },
};
