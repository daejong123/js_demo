console.log('1')
console.log('2')
setTimeout(() => {
    console.log('1111')
},0)
process.nextTick(() => {
    console.log('111111')
})
console.log('3')
console.log('4')
console.log('5')
console.log('6')

console.log(process.cwd())

console.log(process.memoryUsage())

function a(name) {
    console.log(arguments); /* { '0': 'dottie', '1': 'daejong' } */
}

a('dottie', 'daejong')