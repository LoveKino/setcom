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
    return unionSet(ranges);
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
let unionSet = (ranges) => {
    let ret = null;
    for (let i = 0; i < ranges.length; i++) {
        let range = ranges[i];
        if (!ret) {
            ret = range;
        } else {
            for (let j = 0; j < range.length; j++) {
                if (!contain(ret, range[j])) {
                    ret.push(range[j]);
                }
            }
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
let interset = (ranges) => {
    let ret = null;
    for (let i = 0; i < ranges.length; i++) {
        let range = ranges[i];
        if (!ret) {
            ret = range;
        } else {
            let inter = [];
            for (let j = 0; j < range.length; j++) {
                if (contain(ret, range[j])) {
                    inter.push(range[j]);
                }
            }
            ret = inter;
        }
    }
    return ret || [];
};


let contain = (list, item) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === item) {
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

let findIndex = (list, item) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === item) {
            return i;
        }
    }
    return -1;
};

module.exports = {
    contain,
    unionSet,
    interset,
    combineMatrix,
    descartes,
    andHigh,
    findIndex
};

;(function () {
        var __exportsVariable = require('/Users/yuer/workspaceforme/opensource/setcom/node_modules/defcomment/src/unit').exportsVariable;
        __exportsVariable('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/baseset.js', 'combineMatrix', combineMatrix);
__exportsVariable('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/baseset.js', 'descartes', descartes);
__exportsVariable('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/baseset.js', 'unionSet', unionSet);
__exportsVariable('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/baseset.js', 'interset', interset);
__exportsVariable('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/baseset.js', 'andHigh', andHigh);
    })();
    