'use strict';

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

/**
 *
 * ## test
[
    [
        [
            [
                [1, 2, 3]
            ]
        ],
        [
            [1],
            [2],
            [3]
        ]
    ],
   [
        [
            [
                [1, 2, 3],
                [4, 5]
            ]
        ],
        [
            [1, 4],
            [1, 5],
            [2, 4],
            [2, 5],
            [3, 4],
            [3, 5]
        ]
   ],
    [
        [
            [
                [1, 2],
                [3],
                [4]
            ]
        ],
        [
            [1, 3, 4],
            [2, 3, 4]
        ]
   ]
]
*/

let descartes = (ranges) => {
    let ret = null;
    for (let i = 0; i < ranges.length; i++) {
        let range = ranges[i];
        if (!ret) {
            ret = [];
            for (let j = 0; j < range.length; j++) {
                let elem = range[j];
                ret.push([elem]);
            }
        } else {
            let newRet = [];
            for (let k = 0; k < ret.length; k++) {
                let retElem = ret[k];
                for (let j = 0; j < range.length; j++) {
                    let elem = range[j];
                    newRet.push(retElem.concat([elem]));
                }
            }
            ret = newRet;
        }
    }
    return ret || [];
};

/**
 *
 * ## test
[
    [
        [
            [
                [1, 2],
                [4, 5],
                [1, 5]
            ]
        ],
        [1, 2, 4, 5]
    ]
]
*/
let union = (ranges, eq) => {
    let ret = null;
    for (let i = 0; i < ranges.length; i++) {
        let range = ranges[i];
        if (!ret) {
            ret = range.slice(0); // copy
        } else {
            for (let j = 0; j < range.length; j++) {
                if (!contain(ret, range[j], eq)) {
                    ret.push(range[j]);
                }
            }
        }
    }
    return ret || [];
};

/**
 * difference set
 *
 * ## test
[
    [
        [
            [1, 2, 3, 4],
            [3, 2, 5, 7]
        ],
        [1, 4]
    ]
]
*/
let difference = (set1, set2, eq) => {
    let diff = [];
    for (let i = 0; i < set1.length; i++) {
        if (!contain(set2, set1[i], eq)) {
            diff.push(set1[i]);
        }
    }
    return diff;
};

/**
 *
 * ## test
[
    [
        [
            [[1, 2, 3], [2, 3], [4, 2, 3]]
        ],
        [2, 3]
    ],
    [
        [
            [[1, 2, 3]]
        ],
        [1, 2, 3]
    ]
]
*/
let interset = (ranges, eq) => {
    let ret = null;
    for (let i = 0; i < ranges.length; i++) {
        let range = ranges[i];
        if (!ret) {
            ret = range.slice(0);
        } else {
            let inter = [];
            for (let j = 0; j < range.length; j++) {
                if (contain(ret, range[j], eq)) {
                    inter.push(range[j]);
                }
            }
            ret = inter;
        }
    }
    return ret || [];
};

let contain = (list, item, eq) => {
    eq = eq || defEq;
    for (let i = 0; i < list.length; i++) {
        if (eq(list[i], item)) {
            return true;
        }
    }
    return false;
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
 *
 * ## test
[
    [
        [1, 6, 2],
        [1, 3, 5, 6]
    ],
    [
        [6, 1, -2],
        [6, 4, 2, 1]
    ],
    [
        [6, 4],
        [6, 5, 4]
    ],
    [
        [4, 6],
        [4, 5, 6]
    ],
    [
        [0, 0],
        [0]
    ],
    [
        [4, 2, 1],
        [4, 2]
    ],
    [
        [1, 5, 0],
        [1, 5]
    ],
    [
        [2, 4, -1],
        [2, 4]
    ]
]
*/

let section = (start, end, step) => {
    let defStep = 1;
    if (end < start) defStep = -1;
    else if (end === start) defStep = 0;
    if (step === undefined) step = defStep;
    let ret = [start];
    if (step > 0) {
        for (var i = start + step; i < end; i += step) {
            ret.push(i);
        }
    } else {
        for (var j = start + step; j > end; j += step) {
            ret.push(j);
        }
    }

    start !== end && ret.push(end);
    return ret;
};

/**
 * ## test
[
    [
        [
            [1, 4, 6, 7, 4]
        ],
        [1, 4, 6, 7]
    ]
]
*/
let deRepeat = (list, eq) => {
    let ret = [];
    for (let i = 0; i < list.length; i++) {
        if (!contain(ret, list[i], eq)) {
            ret.push(list[i]);
        }
    }
    return ret;
};

let defEq = (a, b) => a === b;

module.exports = {
    contain,
    union,
    interset,
    combineMatrix,
    descartes,
    andHigh,
    findIndex,
    section,
    difference,
    deRepeat
};
