'use strict';

let index = require('../../index');
let baseset = require('../../src/baseset');

let section = baseset.section;

let belong = index.belong;
let all = index.all;
let defVar = index.defVar;
let assign = index.assign;
let predicate = index.predicate;

let A = section(1, 10);
let B = section(2, 12);
let C = section(3, 20);

let x = defVar(),
    y = defVar(),
    z = defVar();
belong(x, A);
belong(y, B);
belong(z, C);

predicate(x, y, z, (x, y, z) => {
    return x * x + y * y === z * z;
});

let D = all(x, y, z);

console.log(D); // eslint-disable-line
