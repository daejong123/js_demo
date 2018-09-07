/**
 * created byz 2018-08-25
 * 脚本：下载http://wiki.wonderbits.cc上模块内容。
 * 包含夸克3的13个模块。
 */

const request = require('request');
const fs = require('fs');
const path = require('path');

const wikiHost = 'http://wiki.wonderbits.cc/doku.php';
const moduleNamesMapping = {
    "主控": "master",
    "信号": "signal",
    "彩灯": "led",
    "控制": "control",
    "显示": "display",
    "监测": "observer",
    "脉搏": "pulse",
    "霍尔": "hall",
    "驱动": "driver",
    "超声波": "ultrasonic",
    "加速度计": "acceleration",
    "射频通信": "rfcommunication",
    "射频遥控器": "rftelecontroller"
}
const moduleKeys = Object.keys(moduleNamesMapping);

let wikiFolder = path.join(__dirname, 'wiki1');
if (!fs.existsSync(wikiFolder)) {
    console.log('正在当前目录下创建wiki文件夹，用来存放wiki内容')
    fs.mkdirSync(wikiFolder)
    console.log('当前目录下wiki文件夹创建成功')
}

function startGetWiki(index) {
    if (index === moduleKeys.length) {
        console.log(`>>> wiki中${moduleKeys.length}个模块已经全部下载完毕!`);
        return;
    }
    let moduleKey = moduleKeys[index];
    let moduleName = moduleNamesMapping[moduleKey];
    let fileUrl = `${wikiHost}?id=模块:${moduleKey}&do=export_pdf`;
    let fileName = `wiki/${moduleName}.pdf`;
    downloadFile(fileUrl, fileName, function () {
        console.log(`${index+1}. ${moduleKey} ==> 下载完毕 ==> ${fileName}`);
        startGetWiki(index + 1);
    });
}

function downloadFile(uri, fileName, callback) {
    let stream = fs.createWriteStream(fileName);
    request(encodeURI(uri)).pipe(stream).on('close', callback);
}

console.log(`>>> 正在下载wiki内容，一共${moduleKeys.length}个模块，请等待...`);
try {
    startGetWiki(0);
} catch (e) {
    console.log(`下载失败 ${e}`);
}