'use strict';
require('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/baseset.js');
let unit = require('/Users/yuer/workspaceforme/opensource/setcom/node_modules/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];
cases.push(
    it('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/baseset.js',
         'combineMatrix',
         [
[
[
[
[
[1, 2, 3],
[2, 3, 4]
],
[
[5, 6, 7],
[7, 8, 9]
]
]
],
[2, 3, 7]
]
],
         "[\n[\n[\n[\n[\n[1, 2, 3],\n[2, 3, 4]\n],\n[\n[5, 6, 7],\n[7, 8, 9]\n]\n]\n],\n[2, 3, 7]\n]\n]")
);

cases.push(
    it('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/baseset.js',
         'descartes',
         [
[
[
[
[1, 2, 3]
]
],
[
[1],
[2],
[3]
]
],
[
[
[
[1, 2, 3],
[4, 5]
]
],
[
[1, 4],
[1, 5],
[2, 4],
[2, 5],
[3, 4],
[3, 5]
]
],
[
[
[
[1, 2],
[3],
[4]
]
],
[
[1, 3, 4],
[2, 3, 4]
]
]
],
         "[\n[\n[\n[\n[1, 2, 3]\n]\n],\n[\n[1],\n[2],\n[3]\n]\n],\n[\n[\n[\n[1, 2, 3],\n[4, 5]\n]\n],\n[\n[1, 4],\n[1, 5],\n[2, 4],\n[2, 5],\n[3, 4],\n[3, 5]\n]\n],\n[\n[\n[\n[1, 2],\n[3],\n[4]\n]\n],\n[\n[1, 3, 4],\n[2, 3, 4]\n]\n]\n]")
);

cases.push(
    it('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/baseset.js',
         'unionSet',
         [
[
[
[
[1, 2],
[4, 5],
[1, 5]
]
],
[1, 2, 4, 5]
]
],
         "[\n[\n[\n[\n[1, 2],\n[4, 5],\n[1, 5]\n]\n],\n[1, 2, 4, 5]\n]\n]")
);

cases.push(
    it('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/baseset.js',
         'interset',
         [
[
[
[[1, 2, 3], [2, 3], [4, 2, 3]]
],
[2, 3]
],
[
[
[[1, 2, 3]]
],
[1, 2, 3]
]
],
         "[\n[\n[\n[[1, 2, 3], [2, 3], [4, 2, 3]]\n],\n[2, 3]\n],\n[\n[\n[[1, 2, 3]]\n],\n[1, 2, 3]\n]\n]")
);

cases.push(
    it('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/baseset.js',
         'andHigh',
         [
[
[
[(x) => x > 3],
[3]
],
false
],
[
[
[(x, y) => x + y > 10, (x) => x < 5],
[4, 20]
],
true
]
],
         "[\n[\n[\n[(x) => x > 3],\n[3]\n],\nfalse\n],\n[\n[\n[(x, y) => x + y > 10, (x) => x < 5],\n[4, 20]\n],\ntrue\n]\n]")
);
var testRets = runCases(cases, '/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/baseset.js');
if(typeof module === 'object') {
    module.exports = testRets;
}
