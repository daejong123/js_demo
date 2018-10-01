/**
 * 正则表达式 reg
 * reg的方法 reg.test(str);
 *          reg.exec(str)
 * 
 * str的方法 str.match(reg)
 *          str.search(reg) 查看是否匹配的到
 *          str.replace(reg, replaceValue)
 *              str.replce(reg, function($, $1...) {return $n + .. + $1})
 *          str.split(reg)
 * 
 * 表达式 [] 里面放的是一个范围 最终只会取一位。
 * 如 [0-9A-z] [^0-9A-z] 在表达式中^表示的非。 在其他地方表示开头。
 * 
 * 而 表示式 () 表示匹配里面所有 
 * 如(abc|bcd) 表示匹配 abc 或者 bcd
 * 
 * \d数字 \w单词字符 \s空白字符 \b单词边界
 * 
 * ^ 先搞清楚^匹配字符串开始位置（其实就是从字符串左边第一个字符开始匹配）
 * 
 * 反斜杠是使后面的字符转义： 一些关键字符
 * 如： + * ？ （ ） . \ / [ ] ^ $ 等。
 */

let reg = /a/g;
let str = "abc\na";
console.log(str.match(reg)) // [ 'a', 'a' ]

let reg1 = /^a/g;
let str1 = "abc\na";
console.log(str1.match(reg1)) // [ 'a' ]
let reg2 = /^a/gm;
console.log(str1.match(reg2)) // [ 'a', 'a' ]

console.log("***************")
/**
 * reg.exec() 和 lastIndex 关系
 */

 let regg = /ab/g;
 let strr = "abababab";
 console.log(regg.exec(strr)); // [ 'ab', index: 0, input: 'abababab' ]
 console.log(regg.lastIndex) // 2
 console.log(regg.exec(strr)); // [ 'ab', index: 2, input: 'abababab' ]
 console.log(regg.lastIndex) // 4
 console.log(regg.exec(strr)); // [ 'ab', index: 4, input: 'abababab' ]
 console.log(regg.lastIndex) //6
 console.log(regg.exec(strr)); // [ 'ab', index: 6, input: 'abababab' ]
 console.log(regg.exec(strr)); // null
 console.log(regg.exec(strr)); // [ 'ab', index: 0, input: 'abababab' ]

 console.log(regg.lastIndex) // 2

 /**
  * () 子表达式 这个括号会记录里面的内容。然后可以通过反向匹配引用出来 
  * 如 /(a)\1/g 这里的\1就是表示引用第一个子表达式里面的内容 
  */

let str3 = "aabb";
let reg3 = /(\w)\1/g;
console.log(str3.match(reg3)) // [ 'aa', 'bb' ]
console.log(reg3.test(str3)) // true

let str4 = "acabccb";
let reg4 = /(\w)c\1/g;
console.log(str4.match(reg4)) // [ 'aca' ]
console.log(reg4.test(str4)) // true

let str5 = "aabb4455";
let reg5 = /(\w)\1(\w)\2(\d)\3/g;
console.log(reg5.test(str5));  // true
console.log(str5.match(reg5)); // [ 'aabb44' ]

console.log(reg5.exec(str5)); // [ 'aabb44', 'a', 'b', '4', index: 0, input: 'aabb4455' ]
/**
 * [ 'aabb44', 'a', 'b', '4', index: 0, input: 'aabb4455' ]
 * 这里发现伪数组元素变多了， 就是那个()匹配的内容。
 */

 
console.log('************************&*&*&*');
let str6 = "asdfadfasdffasdfasdfasdfccadfasdfasdfddasdfasdfdfgffffgdsfgsdfgd";
let reg6 = /(\w)\1/g;
console.log(str6.split(reg6))
/*
[ 'asdfadfasd',
  'f',
  'asdfasdfasdf',
  'c',
  'adfasdfasdf',
  'd',
  'asdfasdfdfg',
  'f',
  '',
  'f',
  'gdsfgsdfgd' ]
*/

/**
 *  str.replace 这个很重要，很常用哦。
 *  replace(target, "这里可以反向引用") 用$n来方向引用
 */


let str7 = "abcdea";
console.log(str7.replace('a', 'g')); // gbcdea, 因为他没有访问全局的能力。
let reg7 = /a/g;
console.log(str7.replace(reg7, 'g')); // gbcdeg, 正则有访问全局的能力。

// 如： 我们想要获取结果为： bbaa
let str8 = "aabb";
let reg8 = /(\w)\1(\w)\2/g;
console.log(str8.replace(reg8, '$2$2$1$1')) // bbaa
// 而且也可以自己处理返回的结果。
console.log(str8.replace(reg8, function($, $1, $2){
    console.log($); // aabb
    return $2 + $2 + $1 + $1; // bbaa
}))

/**
 * 练习：
 * 将i-love-dottie 变成 iLoveDottie
 */
let str9 = "i-love-dottie";
let reg9 = /-(\w)/g;
console.log(str9.match(reg9)) // [ '-l', '-d' ]
console.log(str9.replace(reg9, function($, $1) {
    return $1.toLocaleUpperCase(); // iLoveDottie
}));

/**
 * 练习二：
 * 将iLoveDottie 变成 i-love-dottie
 */
let str10 = "iLoveDottie";
let reg10 = /([A-Z])/g;
console.log(str10.replace(reg10, function($, $1) {
    return "-" + $1.toLocaleLowerCase(); // i-love-dottie
}));

/**
 * [非]正向预查，正向断言 (?=a) (?!a)
 * (?=a) 该括号内的不参与结果。 这是辅助括号外的查询。
 * 
 */
let str11 = "abacad";
let reg11 = /a(?=c)/g; // 表示 查找a后面是c的a。 但是c不参与结果输出
console.log(str11.match(reg11)); // [ 'a' ]
let reg111 = /a(?!c)/g; // 表示 查找a后面不是c的a。
console.log(str11.match(reg111)); // [ 'a', 'a' ] 这里的a是 ab ad中的a。

// 如果 我们想查找不是以大写字母开头的单词
let strArr = ["aBC", "BCD", "Bcd", "c3e", 'F', 'e', 'f_ff'];
let regArr = /^(?![A-Z])[\w\d_]*/g;
strArr.forEach((elem) => {
    console.log(elem.match(regArr));
    /*
    [ 'aBC' ]
    null
    null
    [ 'c3e' ]
    null
    [ 'e' ]
    [ 'f_ff' ]
    */
});
let result = strArr.filter(elem => /^(?![A-Z]).*/g.test(elem));
console.log(result) // [ 'aBC', 'c3e', 'e', 'f_ff' ]


/**
 * 正则表达式默认是贪婪匹配。能取多个绝不取少的。
 * 可以用？来打破贪婪匹配。
 */

 let str12 = "aaaa";
 let reg12 = /a{1,3}/g;
 console.log(str12.match(reg12)); // [ 'aaa', 'a' ]
 let reg122 = /a{1,3}?/g; // 这里就会只取一个a作为匹配。
 console.log(str12.match(reg122)); // [ 'a', 'a', 'a', 'a' ]

 /**
  * 字符串去重
  * 将aaaaaabbbbbbccccccccccdddddddd 变成abcd
  */

  let str13 = "aaaaaabbbbbbccccccccccdddddddd";
  let reg13 = /(\w)\1+/g;
  console.log(str13.replace(reg13, "$1")); // abcd


  /**
   * 很经典！！！
   * 分割数字 
   * 123456789 从后往前每个三位加个分隔符(.)
   * 123.456.789
   */
function reverseStr(str) {
    return str.split("").reverse().join("");
}
let str14 = "123456789";
// 匹配三位数字，并且这三位数字不是结尾。或者非单词边界(?=\B)
let reg14 = /(\d{3})(?!$)/g;  // 注意如果不加正向断言 结果会是  .123.456.789
console.log(reverseStr(reverseStr(str14).replace(reg14, "$1."))) // 123.456.789

// 方法二：
// 这种位置查询插入的。可以考虑用 正向预查(断言)
// 从后往前，每隔三位进行正向预查。
// 利用正向预查(不参与结果， 可以查到但返回为空, 空不是真的空，是带有位置信息的空)， 然后对匹配上的(即返回空的位置添加点号)
let reg144 = /(?=(?!^)(\d{3})+$)/g; 
console.log(str14.match(reg144)) // [ '', '' ]
console.log(str14.replace(reg144, ".")) // 123.456.789

// 示例
let reg15 = /c(?=d)/g; // 将后面是d的c 替换成.
let str15 = "abcdefghicecdfg"; 
console.log(str15.replace(reg15, ".")) // ab.defghice.dfg

// 这个有点复杂。不推荐
let reg16 = /(?=(?!^)(\w{3})+(?!\w))/g;
console.log(str15.replace(reg16, ".")) // abc.def.ghi.cec.dfg

// 推荐
let reg17 = /(\w{3})(?!$)/g;
console.log(str15.replace(reg17, "$1.")) // abc.def.ghi.cec.dfg

let str18 = "abcdefghicecdfg"; 
let reg18 = /(\w{3})(?!$)/g;
console.log(str18.replace(reg18, "$1.")) // abc.def.ghi.cec.dfg

let str19 = "abcd";
let reg19 = /(?!\w)/g; // 不是字符前面的
console.log(str19.replace(reg19, "#")) // abcd#


let str20 = "abcd";
let reg20 = /(?=\w)/g; // 是字符前面的位置
console.log(str20.replace(reg20, "#")) // #a#b#c#d

let str21 = "abcdef";
let reg21 = /(?=(\w{2})+(?!\w))/g; // 任意两个字符前面的位置，
console.log(str21.replace(reg21, "#")) // #a#b#cd