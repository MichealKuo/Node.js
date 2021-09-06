//const {f1,f3} = require('./arrow-func'); 主要匯入手法
const {f1,f3} = require('./arrow-func');
const f2 = require(__dirname + '/arrow-func');

// console.log('2:', __dirname );
console.log(f1(9));
console.log(f3(10));


console.log(f2.f1(5));
console.log(f2.f3(5));