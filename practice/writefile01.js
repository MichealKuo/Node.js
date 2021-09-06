const fs = require('fs');

//fs=filesystem


const data = {
    name: 'David',
    age: 28
};

fs.writeFile(
    __dirname + '/data.json',
    
    //和此js 同層資料夾__dirname + '/data.json',

    JSON.stringify(data, null ,4),
    //  轉JSON
    
    error=>{

    if(error){
        console.log('無法寫入檔案',error);
        process.exit();//結束程式
    }
    console.log('寫入成功');
    });







//fs.writeFile('檔名','資料')