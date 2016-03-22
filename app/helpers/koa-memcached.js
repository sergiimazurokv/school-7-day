'use strict';

const CoMemcached = require('../managers/Mem');

module.exports = (...args) => {
  return function* memcached(next) {
    this.memcached = yield CoMemcached(args);
    try {
      yield* next;
    } catch (e) {
      throw e;
    }
  };
};