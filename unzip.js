const fs = require('fs');
// const unzip = require('unzip');


var adm_zip = require('adm-zip'); //需要引入adm-zip包
try {
var unzip = new adm_zip('/Users/daejong/Desktop/A系列课程0811.wbcourseset');
unzip.extractAllTo("./unarchive", true);
console.log('chenggong...')
} catch(e) {
    console.log(e);
}
