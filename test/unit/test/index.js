'use strict';
require('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/index.js');
let unit = require('/Users/yuer/workspaceforme/opensource/setcom/node_modules/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];
cases.push(
    it('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/index.js',
         'belong',
         [
[[null, [1, 2], [3, 4]], {
ranges: [[[1, 2], [3, 4]]],
predicates: [],
pick: null
}]
],
         "[\n[[null, [1, 2], [3, 4]], {\nranges: [[[1, 2], [3, 4]]],\npredicates: [],\npick: null\n}]\n]")
);
var testRets = runCases(cases, '/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/index.js');
if(typeof module === 'object') {
    module.exports = testRets;
}
