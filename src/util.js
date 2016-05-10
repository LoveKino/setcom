'use strict';

let baseset = require('./baseset');
let union = baseset.union;
let interset = baseset.interset;

/**
 *
 * ## test
[
    [
        [
            [
                [
                    [1, 2, 3],
                    [2, 3, 4]
                ],
                [
                    [5, 6, 7],
                    [7, 8, 9]
                ]
            ]
        ],
        [2, 3, 7]
    ]
]
*/

let combineMatrix = (rangeMatrix) => {
    let ranges = [];
    for (let i = 0; i < rangeMatrix.length; i++) {
        ranges.push(interset(rangeMatrix[i]));
    }
    return union(ranges);
};

let findIndex = (list, item, eq) => {
    eq = eq || defEq;
    for (let i = 0; i < list.length; i++) {
        if (eq(list[i], item)) {
            return i;
        }
    }
    return -1;
};

/**
 * ## test
[
    [
        [
            [(x) => x > 3],
            [3]
        ],
        false
    ],
    [
        [
            [(x, y) => x + y > 10, (x) => x < 5],
            [4, 20]
        ],
        true
    ]
]
*/

let andHigh = (boolFuns, params) => {
    for (let k = 0; k < boolFuns.length; k++) {
        let boolFun = boolFuns[k];
        let ret = boolFun.apply(undefined, params);
        if (!ret) {
            return false;
        }
    }
    return true;
};

let defEq = (a, b) => a === b;

let assign = function (target) {
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var output = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
            for (var nextKey in source) {
                if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
                    output[nextKey] = source[nextKey];
                }
            }
        }
    }
    return output;
};

module.exports = {
    combineMatrix,
    findIndex,
    andHigh,
    assign
};
