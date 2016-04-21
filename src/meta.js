'use strict';

/**
 * meta expression
 *
 * A._(0) -> { index, array, type }
 * f._(0) -> { args, fun }
 */

module.exports = () => {
    Array.prototype._ = () => {};
    Function.prototype._ = () => {};
};
