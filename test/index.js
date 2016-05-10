'use strict';

let assert = require('assert');
let index = require('../index');
let all = index.all;
let elemOf = index.elemOf;
let assign = index.assign;
let predicate = index.predicate;

let logic = index.logic;
let any = index.any;
let exist = index.exist;

let jsoneq = require('cl-jsoneq');

describe('index', () => {
    it('simple', () => {
        let A = [1, 2, 3, 4];
        let x = elemOf(A);
        let B = all(x);
        assert.equal(jsoneq(B, [1, 2, 3, 4]), true);
    });

    it('simple2', () => {
        let A = [1, 2, 3, 4];
        let x = elemOf(A);
        predicate(x, x => x < 3);
        let B = all(x);
        assert.equal(jsoneq(B, [1, 2]), true);
    });

    it('two variable', () => {
        let A = [1, 2, 3, 4];
        let B = [5, 4];
        let x = elemOf(A);
        let y = elemOf(B);
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
        let x = elemOf(A);
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
        let a = elemOf(A),
            b = elemOf(a);
        let B = all(b);
        assert.equal(jsoneq(B, [1, 2, 3, 4, 5, 6]), true);
    });

    it('any', () => {
        let t1 = logic(any(elemOf([4, 5, 6])), (a) => a > 3);
        let t2 = logic(any(elemOf([4, 5, 6])), (a) => a > 5);
        assert.equal(t1, true);
        assert.equal(t2, false);
    });

    it('exist', () => {
        let A = [4, 7, 6];
        let a = elemOf(A);
        let t1 = logic(exist(a), (a) => a > 5);
        let t2 = logic(exist(a), (a) => a > 15);
        assert.equal(t1, true);
        assert.equal(t2, false);
    });
});
