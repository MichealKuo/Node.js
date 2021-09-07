require('dotenv').config();

const express = require('express');

const app = express();
//建立  app  把  express 當作func 使用

//app.set('key','value');設定樣板引擎
app.set('view engine','ejs');

//app.use top-level line 52
// use 是不管什麼方式取得都可以 相較get 和 post

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'));

app.use('/jquery',express.static('/Users/micheal/Documents/mfee19-node/node_modules/jquery/dist/jquery.min.js'));
//app.use('參數',express.static('路徑'))

app.use('/bootstrap',express.static('/Users/micheal/Documents/mfee19-node/node_modules/bootstrap/dist'));




//建立的靜態資料夾

// ***路由定義開始: BEGIN
app.get('/', (req,res)=> {
    
    //ejs 面板
    res.render('home', {name: 'Micheal'})
    //res.send(`<h2>Hello</h2>`)
});

app.get('/json-sales', (req,res)=> {
    
    const sales = require('./data/sales');
    //require 近來會是原生的陣列
    console.log(sales);
    // res.json(sales);//因為是router所以一定要輸出東西

    res.render('json-sales',{sales}) //json-sales.ejs  {sales} 用大括號包因為把它轉物件
});

app.get('/try-qs', (req, res)=>{
    res.json(req.query);
});

//urlencodedParser 和jsonParser 的解譯器

// const urlencodedParser = express.urlencoded({extended: false},)
// const jsonParser = express.json();

//[urlencodedParser, jsonParser]= middleware , 把他合併 這樣都可以使用此post 做出json 和 urlencoded  
// app.post('/try-post', [urlencodedParser, jsonParser],(req,res)=>{
//     res.json(req.query);
// });



//***路由定義結束: END
//路由結束一定要放在路由    最後面
app.get('/', (req,res)=> {
    res.status(404).send(`<h2>找不到頁面</h2>`)
});


// 預設3000 不然就自加上  || 3000
let port = process.env.PORT || 3000;

const node_env = process.env.NODE_ENV || 'development';
//加上監聽器
app.listen(port, ()=>{

    console.log(`NODE_ENV:${process.env.NODE_ENV}`);

     //NODE_ENV=production 可以直接加上 (在package.json頁面)

    console.log(`啟動: ${port}`, new Date());

});
