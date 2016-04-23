'use strict';

let all = require('./reduce').all;
let set = require('./set');
let logic = require('./logic');
let baseset = require('./baseset');

let elemOf = (list) => {
    let variable = set.defVar();
    set.belong(variable, list);
    return variable;
};

module.exports = {
    belong: set.belong,
    predicate: set.predicate,
    assign: set.assign,
    defVar: set.defVar,
    all,
    logic: logic.logic,
    any: logic.any,
    exist: logic.exist,
    contain: baseset.contain,
    unionSet: baseset.unionSet,
    interset: baseset.interset,
    difference: baseset.difference,
    descartes: baseset.descartes,
    elemOf,
    section: baseset.section
};
