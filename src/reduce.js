'use strict';

let baseset = require('./baseset');

/**
 * variable
 *      ranges
 *      predicates [{vars, boolFuns}]
 *      pick
 */

let all = function () {
    let args = Array.prototype.slice.call(arguments);
    let red = reduce(args);
    let rets = red.rets;
    if (args.length === 1) {
        let res = [];
        let index = baseset.findIndex(red.vars, args[0]);
        for (let i = 0; i < rets.length; i++) {
            res.push(rets[i][index]);
        }
        rets = res;
    }
    return rets;
};

let reduce = (args) => {
    let rets = reducePredicates(args.slice(0));
    return rets;
};

let narrow = (variable) => {
    let range = null;
    if (variable.ranges.length) {
        range = reduceRanges(variable.ranges);
    }

    if (variable.pick) {
        let pickRange = reducePick(variable.pick);
        if (range) {
            range = baseset.interset([range, pickRange]);
        } else {
            range = pickRange;
        }
    }
    return range;
};

let reducePick = (pick) => {
    let rets = [];

    let func = pick.func;
    // reduce deps
    let deps = reduce(pick.vars);

    let varsRange = deps.rets;
    for (let i = 0; i < varsRange.length; i++) {
        let vars = varsRange[i];
        rets.push(func.apply(undefined, vars));
    }
    return rets;
};

let reduceRanges = (ranges) => baseset.combineMatrix(ranges);

let reducePredicates = (variables) => {
    let vars = findRelatedVars(variables);
    let ranges = [];
    for (let i = 0; i < vars.length; i++) {
        ranges.push(narrow(vars[i]));
    }
    let range = baseset.descartes(ranges);
    //
    let predicates = getAllPredicates(vars);
    let rets = filterFromPredicates(predicates, vars, range);

    return {
        vars,
        rets
    };
};

let filterFromPredicates = (predicates, vars, range) => {
    if (!predicates.length) return range;
    let rets = [];

    for (let i = 0; i < predicates.length; i++) {
        let predicate = predicates[i];
        let depVars = predicate.vars;
        let boolFun = predicate.boolFun;
        let indexes = getIndexes(vars, depVars);

        for (let i = 0; i < range.length; i++) {
            let params = range[i];
            let newParams = getParams(params, indexes);
            if (boolFun.apply(undefined, newParams)) {
                rets.push(params);
            }
        }
    }
    return rets;
};

let getParams = (params, indexes) => {
    let newParams = [];
    for (let i = 0; i < indexes.length; i++) {
        newParams.push(params[indexes[i]]);
    }
    return newParams;
};

let getIndexes = (vars, depVars) => {
    let indexes = [];
    for (let i = 0; i < depVars.length; i++) {
        let index = baseset.findIndex(vars, depVars[i]);
        indexes.push(index);
    }
    return indexes;
};

let getAllPredicates = (vars) => {
    let preds = [];
    for (let i = 0; i < vars.length; i++) {
        let variable = vars[i];
        let predicates = variable.predicates;
        preds = baseset.unionSet([preds, predicates]);
    }
    return preds;
};

let findRelatedVars = (open, close) => {
    close = close || [];
    open = open || [];
    while (open.length) {
        let top = open.pop();
        close.push(top);
        let predicates = top.predicates;
        for (let i = 0; i < predicates.length; i++) {
            let predicate = predicates[i];
            let depVars = predicate.vars;
            for (let j = 0; j < depVars.length; j++) {
                let depVar = depVars[j];
                if (!baseset.contain(close, depVar)) {
                    open.push(depVar);
                }
            }
        }
    }
    return close;
};

module.exports = {
    reduce,
    all
};
