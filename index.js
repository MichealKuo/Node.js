require('dotenv').config();

const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;

const upload = multer({dest: __dirname + '/tmp_uploads/'});
const uploadImg = require('./modules/upload-images');

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
app.post('/try-post', (req, res)=>{
    res.json(req.body);
});

app.get('/try-post-form', (req, res)=>{
    res.render('try-post-form');
});

app.post('/try-post-form', (req, res)=>{
    res.render('try-post-form', req.body);
});

app.get('/pending', (req, res)=>{
});

//檔案上傳
//因為是promise 所以使用await + async

app.post('/try-upload',upload.single('avatar'),async(req,res)=>{
    if(req.file && req.file.mimetype==='image/jpeg'){
        try{

            await fs.rename(req.file.path, __dirname + '/public/img/'+ req.file.originalname);

            res.json({success:true, filename:req.file.originalname});

        } catch(ex){
            res.json({success:false, error: '無法存擋'});
        }
    } else {
        res.json({success:false, error: '格式不對'});
    }

    
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
app.use((req, res)=>{
    res.status(404).send(`<h1>找不到頁面</h1>`)
})

let port = process.env.PORT || 3000;
const node_env = process.env.NODE_ENV || 'development';
app.listen(port, ()=>{
    console.log(`NODE_ENV: ${node_env}`);
    console.log(`啟動: ${port}`, new Date());
});