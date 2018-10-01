

try {
    throw new Error('shibi');
    console.log('123')
} catch (e) {
    console.log(e);
    return;
}

console.log('123')