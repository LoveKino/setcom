'use strict';

/**
 * make some adapter in the module
 */
let util = require('./util');

let reduce = require('./reduce');
let set = require('./set');
let logic = require('./logic');
let baseset = require('./baseset');

let assign = util.assign;

module.exports = assign({}, baseset, logic, set, reduce);
