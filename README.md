# setcom

General Set Declaration DSL.

Set operation DSL.

## install

`npm i setcom --save`

## set example

- eg1: B = {x | x ∈ A, x > 0}

```js
let setcom = require('setcom');
let elemOf = setcom.elemOf;
let all = setcom.all;

let A = [-1, 2, 3, -4];
let x = elemOf(A);
let B = all(x);
console.log(B); // [2, 3]
```

- eg2: C = {(x, y) | x ∈ A, y ∈ B, x + y < 20}

```js
let setcom = require('setcom');
let elemOf = setcom.elemOf;
let all = setcom.all;
let predicate = setcom.predicate;

let A = [6, 10, 20];
let B = [12, 2];
let x = elemOf(A);
let y = elemOf(B);
predicate(x, y, (x, y) => x + y < 20);
let C = all(x, y);
console.log(C); // [[6, 12], [6, 2], [10, 2]]
```

- eg3: B = {y | y = x.a, x ∈ A}

```js
let setcom = require('setcom');
let elemOf = setcom.elemOf;
let all = setcom.all;
let predicate = setcom.predicate;
let assign = setcom.assign;

let A = [{a: 3, b: 2}, {a: 4, b: 5}];
let x = elemOf(A);
let y = assign(x, (x) => x.a);
let B = all(y);
console.log(B); // [3, 4]
```

## logic example

- eg: any x in set A, x > 0

```js
let setcom = require('setcom');
let elemOf = setcom.elemOf;
let logic = setcom.logic;
let any = setcom.any;

let A = [1, 2, 3];

logic(any(elemOf(A)), (x) => x > 0); // true
```

- eg: for any x in A, exist y in B, x + y > 20

```js
let setcom = require('setcom');
let elemOf = setcom.elemOf;
let logic = setcom.logic;
let any = setcom.any;
let exist = setcom.exist;

let A = [1, 2, 3];
let B = [30, 20];

logic(any(elemOf(A)), exist(elemOf(B)), (x, y) => x + y > 20); // true
```
