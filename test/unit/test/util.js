'use strict';
require('/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/util.js');
let unit = require('/Users/yuer/workspaceforme/opensource/setcom/node_modules/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

var testRets = runCases(cases, '/Users/yuer/workspaceforme/opensource/setcom/test/unit/ret/util.js');
if(typeof module === 'object') {
    module.exports = testRets;
}
