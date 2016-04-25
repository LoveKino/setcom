'use strict';

let all = require('./reduce').all;

/**
 * logic comprehension
 */

let any = (variable) => {
    return {
        type: 'any',
        variable
    };
};

let exist = (variable) => {
    return {
        type: 'exist',
        variable
    };
};

let logic = function () {
    let args = Array.prototype.slice.call(arguments);
    let predicate = args.pop();
    let boundVars = reduceVariables(args);
    return logicExps(boundVars, predicate);
};

let reduceVariables = (args) => {
    let rets = [];
    for (let i = 0; i < args.length; i++) {
        let arg = args[i];
        let list = all(arg.variable);
        rets.push({
            type: arg.type,
            set: list
        });
    }
    return rets;
};

/**
 *
 * ## test
[
    [
        [
            [{
                type: 'any',
                set: [3, 5, 9]
            }, {
                type: 'exist',
                set: [6, 9, 2]
            }], (x, y) => x + y > 10
        ], true
    ],
    [
        [
            [{
                type: 'any',
                set: [3, 5, 9]
            }, {
                type: 'any',
                set: [16, 4, 12]
            }], (x, y) => x + y > 10
        ], false
    ]
]
*/

let logicExps = (boundVars, predicate) => {
    if (boundVars.length === 0) {
        return predicate();
    } else {
        let cur = boundVars[0];
        let nextVars = boundVars.slice(1);
        if (cur.type === 'any') {
            return anyLogic(cur, predicate, nextVars);
        } else if (cur.type === 'exist') {
            return existLogic(cur, predicate, nextVars);
        }
    }
};

let anyLogic = (cur, predicate, nextVars) => {
    let list = cur.set;
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let nextPredicate = fillFirst(predicate, item);
        if (!logicExps(nextVars, nextPredicate)) {
            return false;
        }
    }
    return true;
};

let existLogic = (cur, predicate, nextVars) => {
    let list = cur.set;
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let nextPredicate = fillFirst(predicate, item);
        if (logicExps(nextVars, nextPredicate)) {
            return true;
        }
    }
    return false;
};

let fillFirst = (func, arg) => function () {
    let args = Array.prototype.slice.call(arguments);
    args.unshift(arg);
    return func.apply(undefined, args);
};

module.exports = {
    any,
    exist,
    logic
};
