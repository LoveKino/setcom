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
let id = 0;
let defVar = () => {
    return {
        ranges: [],
        predicates: [],
        pick: null,
        id: id++
    };
};

/**
 * ## test
 * [
 *      [[null, [1, 2], [3, 4]], {
 *          ranges: [[[1, 2], [3, 4]]],
 *          predicates: [],
 *          pick: null
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

module.exports = {
    belong,
    predicate,
    assign,
    defVar,
    all
};
