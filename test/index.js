'use strict';

let assert = require('assert');
let index = require('../index');
let belong = index.belong;
let all = index.all;
let defVar = index.defVar;
let assign = index.assign;
let predicate = index.predicate;

let jsoneq = require('cl-jsoneq');

describe('index', () => {
    it('simple', () => {
        let A = [1, 2, 3, 4];
        let x = defVar();
        belong(x, A);
        let B = all(x);
        assert.equal(jsoneq(B, [1, 2, 3, 4]), true);
    });

    it('simple2', () => {
        let A = [1, 2, 3, 4];
        let x = defVar();
        belong(x, A);
        predicate(x, x => x < 3);
        let B = all(x);
        assert.equal(jsoneq(B, [1, 2]), true);
    });

    it('two variable', () => {
        let A = [1, 2, 3, 4];
        let B = [5, 4];
        let x = defVar();
        let y = defVar();
        belong(x, A);
        belong(y, B);
        predicate(x, y, (x, y) => x < 3 && x + y > 6);
        let C = all(x);
        assert.equal(jsoneq(C, [2]), true);
    });

    it('assign', () => {
        let A = [{
            a: 1
        }, {
            a: 2
        }];
        let x = defVar();
        belong(x, A);
        let y = assign(x, (x) => x.a);
        let B = all(y);
        assert.equal(jsoneq(B, [1, 2]), true);
    });

    it('assignT', () => {
        let A = [
            [1, 2],
            [3, 4],
            [5, 6]
        ];
        let a = defVar(),
            b = defVar();
        belong(a, A);
        belong(b, a);
        let B = all(b);
        assert.equal(jsoneq(B, [1, 2, 3, 4, 5, 6]), true);
    });
});
