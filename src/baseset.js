'use strict';

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

let difference = (set1, set2, eq) => {
    let diff = [];
    for (let i = 0; i < set1.length; i++) {
        if (!contain(set2, set1[i], eq)) {
            diff.push(set1[i]);
        }
    }
    return diff;
};

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
    descartes,
    section,
    difference,
    deRepeat
};
