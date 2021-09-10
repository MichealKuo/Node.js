require('dotenv').config();

const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const session = require('express-session')
const upload = multer({dest: __dirname + '/tmp_uploads/'});
const moment = require('moment-timezone');

const uploadImg = require('./modules/upload-images');
const db = require('./modules/connect-mysql');
const app = express();
//建立  app  把  express 當作func 使用

//app.set('key','value');設定樣板引擎
app.set('view engine','ejs');



//app.use top-level line 52
// use 是不管什麼方式取得都可以 相較get 和 post

app.use(session({
    saveUninitialized: false, 
    resave: false, //沒變更內容是否強制回存
    secret:'qaxzvregjhhjklj4lk56123kl;45dfg231', //加密字串
    cookie:{
        maxAge: 1200000,  //20分鐘 單位毫秒
    }
}));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'));

app.use('/jquery',express.static('/Users/micheal/Documents/mfee19-node/node_modules/jquery/dist/jquery.min.js'));
//app.use('參數',express.static('路徑'))

app.use('/bootstrap',express.static('/Users/micheal/Documents/mfee19-node/node_modules/bootstrap/dist'));

app.use((req,res,next)=>{
    // res.send('middleware')
    res.locals.title = 'Micheal的網站';
     next();
    //需要next 他才會往下跑
})


//建立的靜態資料夾

// ***路由定義開始: BEGIN
app.get('/', (req,res)=> {
    //ejs 面板

    res.locals.title= '首頁-'+res.locals.title;
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

app.post('/try-upload2',uploadImg.single('avatar'),async(req,res)=>{
   
    res.json(req.file);

    
});
//多個上傳時候要記得 files
app.post('/try-upload3',uploadImg.array('photo', 10),async(req,res)=>{
   
    res.json(req.files);

    
});

//get( 路徑 )   路徑裡面 action & id 是代稱
app.get('/my-params1/:action?/:id(\\d+)?', (req, res)=>{
    res.json(req.params);
});


//  \倒斜線跳脫字元   d{2} 數字２位   $ 結尾
app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res)=>{
    let u = req.url.split('?')[0];
    u = u.slice(3);
    u = u.split('-').join('');

    res.json({
        url: req.url,
        mobile: u
    });
});

app.use(require('./routes/admin2'));

app.use('/admin3', require('./routes/admin3'));

//session

app.get('/try-sess', (req, res)=>{

    //name: 'mySessionId',
    req.session.myVar = req.session.myVar || 0; //沒有設定的話就是以 ０
    req.session.myVar++;

    res.json(req.session);
});
app.get('/try-moment', (req, res)=>{

    const fm = 'YYYY-MM-DD hh:mm:ss';

   
    res.json({
        m1: moment().format(fm),
        m2: moment().tz('Europe/Berlin').format(fm),
        m3: moment().tz('Asia/Tokyo').format(fm),
    });
});

app.get('/try-db', async (req, res)=>{
    const [r] = await db.query("SELECT * FROM address_book WHERE `name` LIKE ?", ['%李%']);  //like 後面有一個 ?  就需要一個[]去接

    res.json(r);

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