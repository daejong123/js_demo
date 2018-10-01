let fs = require('fs')
const StreamZip = require('node-stream-zip');
const zip = new StreamZip({
    file: '/Users/daejong/Desktop/A系列课程0811.wbcourseset',
    storeEntries: true
});
 
let totalSize = 0;
let hasUnzip = 0;

zip.on('extract', (entry, file) => {
    hasUnzip += entry.size;
    let progress = hasUnzip / (totalSize+0.0);
    console.log(`${(progress * 100).toFixed(0)}% 正在解压 ${entry.name} 到 ${file} `);
});

zip.on('ready', () => {
    for (const entry of Object.values(zip.entries())) {
        const desc = entry.isDirectory ? 'directory' : `${entry.size} bytes`;
        totalSize += entry.isDirectory ? 0 : entry.size;
    }

    fs.mkdirSync('./extracted');
    zip.extract(null, './extracted', (err, count) => {
        console.log(`导入失败 ${err}`)
        console.log(err ? '解压出错' : `解压 ${count} 个文件完成`);
        zip.close();
    });
});