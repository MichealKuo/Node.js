require('dotenv').config();

const express = require('express');

const app = express();
//建立  app  把  express 當作func 使用

app.get('/', (req,res)=> {
    res.send(`<h2>Hello</h2>`)
});

// 預設3000 不然就自加上  || 3000
let port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`啟動: ${port}`, new Date());
});