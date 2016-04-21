'use strict';

let E = function (op, args) {
    if (!isFunction(op)) throw new TypeError('need function as first argument');

    if(!isArray(args)) throw new TypeError('need array as second argument');

    if (!args.length) return null;

    let spargs = splitArgs(args);
    let rest = spargs.rest;
    let prevs = spargs.prevs;

    if (!rest.length) {
        return opList(op, prevs);
    }

    let step = null;
    if (prevs.length > 2) {
        step = prevs[prevs.length - 1] - prevs[prevs.length - 2];
    }
    let start = prevs.pop();
    let end = rest.shift();
    let result = opRange(op, start, end, step);
    return opList(op, prevs.concat([result]).concat(rest));
};

E.ellipsis = {};

let isFunction = v => typeof v === 'function';

let isArray = v => v && typeof v === 'object' && typeof v.length === 'number';

let splitArgs = (args) => {
    let prevs = [];
    let rest = [];
    for (let i = 0; i < args.length; i++) {
        let item = args[i];
        if (item === E.ellipsis) {
            if (i === 0) {
                throw new Error('ellipsis is on the first.');
            }
            if (i === args.length - 1) {
                throw new Error('ellipsis is on the last.');
            }
            rest = args.slice(i + 1);
            break;
        } else {
            prevs.push(item);
        }
    }
    return {
        prevs,
        rest
    };
};

/**
 *
 * ## test
[
    [
        [(a, b) => a + b, [1, 2, 3]], 6
    ],
    [
        [(a, b) => a - b, [10, 2, 3]], 5
    ]
]
*/

let opList = (op, list) => {
    let result = list[0];
    for (let i = 1; i < list.length; i++) {
        result = op(result, list[i]);
    }
    return result;
};

/**
 *
 * ## test
[
    [
        [(a, b) => a + b, 2, 7, 2], 19
    ],
    [
        [(a, b) => a + b, 12, 6, -2], 36
    ],
    [
        [(a, b) => a + b, 12, 10], 33
    ]
]
*/
let opRange = (op, start, end, step) => {
    let def = 1;
    if (start > end) {
        def = -1;
    }
    step = step || def;
    let ret = start;
    if (step > 0) {
        for (var i = start + step; i <= end; i += step) {
            ret = op(ret, i);
        }
        if (i - step < end) {
            ret = op(ret, end);
        }
    } else {
        for (var j = start + step; j >= end; j += step) {
            ret = op(ret, j);
        }
        if (j - step > end) {
            ret = op(ret, end);
        }
    }
    return ret;
};

module.exports = {
    E
};
