'use strict';

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
 * ## example
 *
 * ### eg1
 *
 * B = { x | x ∈ A, x > 0}
 *
 * let x;
 * belong(x, A);
 * predicate(x)(x => x > 0);
 * let B = all(x);
 *
 * ### eg2
 *
 * C = {(x, y) | x ∈ A, y ∈ B, x + y < 10}
 *
 * let x, y;
 * belong(x, A), belong(y, B);
 * predicate(x, y)((x, y) => x + y < 10);
 * let C = all(x, y);
 *
 * ### eg3
 *
 * B = { y | y = x.a, x ∈ A}
 *
 * let x;
 * belong(x, A);
 * let y = assign(x, x => x.a);
 * let B = all(y);
 */
let setVar = () => {
    return {
        ranges: [],
        predicates: [],
        pick: null
    };
};

/**
 * ## test
 * [
 *      [[null, [1, 2], [3, 4]], {
 *          ranges: [[[1, 2], [3, 4]]],
 *          predicates: []
 *      }]
 * ]
 */
let belong = function () {
    let args = Array.prototype.slice.call(arguments);
    let x = args.shift() || setVar();
    x.ranges.push(args);
    return x;
};

let predicate = function () {
    let vars = Array.prototype.slice.call(arguments);
    return function () {
        let boolFuns = Array.prototype.slice.call(arguments);
        let predi = {
            vars,
            boolFuns
        };
        for (let i = 0; i < vars.length; i++) {
            let variable = vars[i];
            variable.predicates.push(predi);
        }
    };
};

let assign = function () {
    let vars = Array.prototype.slice.call(arguments);
    let func = vars.pop();
    let variable = setVar();
    variable.pick = {
        vars,
        func
    };
    return variable;
};

module.exports = {
    belong,
    predicate,
    assign
};
