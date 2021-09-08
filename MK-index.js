require('dotenv').config(); // 載入 .env 的設定

const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const upload = multer({dest: 'tmp_uploads/'});

const app = express();

app.set('view engine', 'ejs');

app.use( express.urlencoded({extended: false}) );
app.use( express.json() );
app.use(express.static('public'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

// *** 路由定義開始 :BEGIN
app.get('/', (req, res)=>{

    res.render('home', {name: 'Micheal'});

    //res.send(`<h2>Hello</h2>`);
});

app.get('/json-sales', (req, res)=>{
    const sales = require('./data/sales');

    // console.log(sales);
    // res.json(sales);
    res.render('json-sales', {sales});
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

app.post('/try-upload', upload.single('avatar'), async (req, res)=>{
    if(req.file && req.file.mimetype==='image/jpeg'){
        try {
            await fs.rename(req.file.path, __dirname + '/public/img/' + req.file.originalname);
            return res.json({success: true, filename: req.file.originalname});
        } catch(ex){
            return res.json({success: false, error: '無法存檔', ex});
        }

    } else {
        await fs.unlink(req.file.path);  // 刪除暫存檔
        res.json({success: false, error: '格式不對'});
    }
});

// *** 路由定義結束 :END

app.use((req, res)=>{
    res.status(404).send(`<h1>找不到頁面</h1>`)
})

let port = process.env.PORT || 3000;
const node_env = process.env.NODE_ENV || 'development';
app.listen(port, ()=>{
    console.log(`NODE_ENV: ${node_env}`);
    console.log(`啟動: ${port}`, new Date());
});