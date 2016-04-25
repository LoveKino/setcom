'use strict';

let all = require('./reduce').all;

/**
 * set comprehesion
 *
 * [ x*2 | x <- [1..10], 2*x < 12]
 * output function    x*2
 * varibale           x
 * input set          [1..10]
 * predicate          2*x < 12
 *
 * short sentences
 */

/**
 * declaration style
 *
 * (1) declare variable
 *
 * (2) declare variable's range
 *
 * (3) declare variable's predicate
 *
 * (4) assign variable (compose some variable to a new variable)
 *
 * (5) output variable
 *
 */
let defVar = () => {
    return {
        ranges: [],
        predicates: [],
        pick: null,
        __type: 'variable'
    };
};

/**
 * ## test
 * [
 *      [[null, [1, 2], [3, 4]], {
 *          ranges: [[[1, 2], [3, 4]]],
 *          predicates: [],
 *          pick: null,
 *          __type: 'variable'
 *      }]
 * ]
 */
let belong = function () {
    let args = Array.prototype.slice.call(arguments);
    let x = args.shift() || defVar();
    x.ranges.push(args);
    return x;
};

let predicate = function () {
    let vars = Array.prototype.slice.call(arguments);
    let boolFun = vars.pop();

    let predi = {
        vars,
        boolFun
    };

    for (let i = 0; i < vars.length; i++) {
        let variable = vars[i];
        variable.predicates.push(predi);
    }
};

let assign = function () {
    let vars = Array.prototype.slice.call(arguments);
    let func = vars.pop();
    let variable = defVar();
    variable.pick = {
        vars,
        func
    };
    return variable;
};

let elemOf = (list) => {
    let variable = defVar();
    belong(variable, list);
    return variable;
};

/**
 * ## test
[
    [
        [
            [1, 2, 3], (x) => x > 2, (x) => x * 2
        ],
        [6]
    ]
]
*/

let defSet = (domain, predi, outputFun) => {
    predi = predi || truthy;
    outputFun = outputFun || id;

    let variable = elemOf(domain);
    predicate(variable, predi);
    let retVariable = assign(variable, outputFun);
    return all(retVariable);
};

let id = v => v;

let truthy = () => true;

module.exports = {
    belong,
    predicate,
    assign,
    defVar,
    elemOf,
    defSet
};
