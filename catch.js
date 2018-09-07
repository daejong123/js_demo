

try {
    throw new Error('shibi');
} catch (e) {
    console.log(e);
    return;
}

console.log('123')