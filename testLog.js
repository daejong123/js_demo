const request = require('request');

request({method:"POST",url:"http://wonderbits.cn:3333/log", body: {
    machine:'123',
    data:'哈哈哈哈哈哈哈哈哈哈或或或'
}, json:true},(error,response,body)=>{
    console.log(response.body)

    if(error){
        // this.buffer.push("提交至服务器失败" + error);
        console.log('fail123')
    }
    else if(response.statusCode !== 200){
        // this.buffer.push("提交至服务器失败" + response.statusCode);
        console.log('fail234')
    } else {
        console.log('success')
    }
});
