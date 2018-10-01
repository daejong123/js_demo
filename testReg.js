let reg = /(\d+)$/g;
console.log(reg.test("asdfas"));
console.log(typeof("asdaf2ddf12".match(reg)[0]))

var max1 = Math.max.call(null, undefined)
console.log(max1)