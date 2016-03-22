'use strict';

const Memcached = require('memcached');

class CoMemcached {

  constructor(memcached) {
    this.memcached = memcached;
  }

  /**
   * @param {string} key - the name of the key
   */
  get(...args) {

    return new Promise((resolve, reject) => {
      args.push((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });

      this.memcached.get.apply(this.memcached, args);
    });
  }

  /**
   * @param {string} key - the name of the key
   */
  gets(...args) {

    return new Promise((resolve, reject) => {
      args.push((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });

      this.memcached.gets.apply(this.memcached, args);
    });
  }

  /**
   * @param {string} key - the name of the key
   */
  has(...args) {
    return new Promise((resolve, reject) => {
      args.push((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(!!data);
      });

      this.memcached.gets.apply(this.memcached, args);
    });
  }

  /**
   * @param {string} key - the name of the key
   * @param {*} value - either a buffer, JSON, number or string that you want to store.
   * @param {number} lifetime - how long the data needs to be stored measured in seconds
   */
  set(...args) {
    return new Promise((resolve, reject) => {
      args.push((err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });

      this.memcached.set.apply(this.memcached, args);
    });
  }

  /**
   * @param {string} key - the name of the key
   */
  del(...args) {

    return new Promise((resolve, reject) => {
      args.push((err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });

      this.memcached.del.apply(this.memcached, args);
    });
  }
}

module.exports = (...args) => {
  return new Promise(resolve => {
    const memcached = new Memcached(...args);
    resolve(new CoMemcached(memcached));
  });
};