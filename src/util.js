'use strict';

let unionSets = (ranges) => {
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
    return ret;
};

let contain = (list, item) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === item) {
            return true;
        }
    }
    return false;
};

module.exports =  {
    contain,
    unionSets
};
