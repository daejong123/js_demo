function fluent(fn) {
	return function(...args) {
    	fn.apply(this, args);
      	return this;
    }
}

function decorateWith(method){
	return (target, name, descriptor) => {
    	descriptor.value = method.call(target, descriptor.value);
    }
}

class Person {
    
  	@decorateWith(fluent)
	setName(first, last) {
    	this.first = first;
  		this.last = last;
    }
      
  sayName() {
  	console.log(this.first, this.last);

  }
}


let p = new Person();
p.setName('daejong', 'lin').sayName();