'use strict';

/**
 * make some adapter in the module
 */

let all = require('./reduce').all;
let set = require('./set');
let logic = require('./logic');
let baseset = require('./baseset');
let pattern = require('cl-ellipsis');
let expand = pattern.expand;
let ellipsis = pattern.ellipsis;

// support ... expandation
let defSet = (domain, predi, outputFun) => {
    domain = expand(domain);
    return set.defSet(domain, predi, outputFun);
};

// support array and ... expandation
let any = (v) => logic.any(getVariable(v));
let exist = (v) => logic.exist(getVariable(v));

let getVariable = (v) => {
    let variable = v;
    if(isArray(v) || typeof v === 'string') {
        v = expand(v);
        variable = set.elemOf(v);
    }
    return variable;
};

let isArray = v => v && typeof v === 'object' && typeof v.length === 'number';

module.exports = {
    belong: set.belong,
    predicate: set.predicate,
    assign: set.assign,
    defVar: set.defVar,
    all,
    logic: logic.logic,
    any: any,
    exist: exist,
    contain: baseset.contain,
    unionSet: baseset.unionSet,
    interset: baseset.interset,
    difference: baseset.difference,
    descartes: baseset.descartes,
    elemOf: set.elemOf,
    section: baseset.section,
    defSet,
    ellipsis,
    deRepeat: baseset.deRepeat
};
