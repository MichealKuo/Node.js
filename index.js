require('dotenv').config();

const express = require('express');

const app = express();
//建立  app  把  express 當作func 使用

app.use(express.static('public'));
//建立的靜態資料夾

// ***路由定義開始: BEGIN
app.get('/', (req,res)=> {
    res.send(`<h2>Hello</h2>`)
});



//***路由定義結束: END
//路由結束一定要放在路由    最後面
app.get('/', (req,res)=> {
    res.status(404).send(`<h2>找不到頁面</h2>`)
});


// 預設3000 不然就自加上  || 3000
let port = process.env.PORT || 3000;

//加上監聽器
app.listen(port, ()=>{

    console.log(`NODE_ENV:${process.env.NODE_ENV}`);

     //NODE_ENV=production 可以直接加上 (在package.json頁面)

    console.log(`啟動: ${port}`, new Date());

});
