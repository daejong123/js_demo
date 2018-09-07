// 组合继承(原型链+构造函数)
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
}

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

function inheritPrototype(subType, superType) {
    let prototype = Object.create(superType.prototype); // 会产生一个以superType.prototype为原型的空对象
    prototype.constructor = subType; 
    subType.prototype = prototype;
}

SubType.prototype = new SuperType();
// SubType.prototype = SuperType.prototype;  
console.log(SubType.prototype.constructor); // [Function: SuperType]
SubType.prototype.constructor = SubType;
console.log(SubType.prototype.constructor); // [Function: SubType]
SubType.prototype.sayAge = function() {
    console.log(this.age);
}

let s1 = new SubType('dottie', 22);
s1.colors.push('black');
console.log(s1.colors); // [ 'red', 'blue', 'green', 'black' ]
s1.sayName(); // dottie
s1.sayAge(); // 22

let s2 = new SubType('daejong', 23);
console.log(s2.colors); // [ 'red', 'blue', 'green' ]
s2.sayName(); // daejong
s2.sayAge(); // 23

console.log(s1.hasOwnProperty('name')); // true
console.log(Object.getPrototypeOf(s1).hasOwnProperty('name')); // true


console.log(s1.hasOwnProperty('age')); // true
console.log(Object.getPrototypeOf(s1).hasOwnProperty('age')); // false


console.log(s1.__proto__.hasOwnProperty('sayAge')); // true



console.log(s1.__proto__ === Object.getPrototypeOf(s1)) // true
// s1.__proto__ === Object.getPrototypeOf(s1)
// 说明父类name属性 存了两份。即存在子类实例中。也存在子类的原型中。

