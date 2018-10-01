let a = ["dottie", "daejong", "china"];
let b = [];

(function result() {
    // let 可以防止闭包。var i. 闭包会依赖i。
    for (let i = 0; i < a.length; i++) {
        // b[i] = i; // 要形成自己的作用域，才可能会产生闭包。
        b[i] = function print() {
            return a[i]; // 如果是var的话， 这里i就会存储为 3. 因为i++ a[3] = null;
        };
    }
})();


for (let j = 0; j < a.length; j++) {
    console.log(b[j]());
}

// 由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。

// 所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

/*
如果你能理解下面两段代码的运行结果，应该就算理解闭包的运行机制了。

代码片段一。

　　var name = "The Window";

　　var object = {
　　　　name : "My Object",

　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};

　　　　}

　　};

　　alert(object.getNameFunc()());


代码片段二。

　　var name = "The Window";

　　var object = {
　　　　name : "My Object",

　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};

　　　　}

　　};

　　alert(object.getNameFunc()());
*/

var name = "The Window";
var object = {　　　　
    name: "My Object",
    getNameFunc: function () {　　
        var that =this;　　　　
        return function () {　　　　　　　　
            return that.name;　　　　　　
        };　　
    }
};
console.log(object.getNameFunc()());