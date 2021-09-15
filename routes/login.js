const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('./../modules/connect-mysql');
const upload = require('./../modules/upload-images');

const router = express.Router();

// 登入
router.get('/login', (req, res)=>{
    res.locals.pageName = 'login';
    res.render('login');
});
router.post('/login', async(req, res)=>{

    //TODO: 欄位檢查

    const [rs] = await db.query("SELECT * FROM members WHERE `email`=?", [req.body.email]);//搜尋時候可以不用toLowerCase()

    if(!rs.length){
        return res.json({success: false});

    }


    const success = await bcrypt.compare(req.body.password, rs[0].password);    

    if(success){
        //選擇id, email, nickname
        const {id, email, nickname} = rs[0];
        req.session.member = {id, email, nickname};
    }

    res.json({success});
});

// 註冊
router.get('/register', (req, res)=>{
    res.locals.pageName = 'register';
    res.render('register');
});
router.post('/register', async (req, res)=>{
    const output = {
        success: false,
        postData: req.body,
        error: ''
    };
    // TODO: 欄位檢查

    const hash = await bcrypt.hash(req.body.password, 10);

    const sql = "INSERT INTO `members`" +
        "(`email`, `password`, `mobile`, `birthday`, `nickname`, `create_at`)" +
        " VALUES (?, ?, ?, ?, ?, NOW())";

    let result;
    try {
        [result] = await db.query(sql, [
            req.body.email.toLowerCase().trim(),
            hash,
            req.body.mobile,
            req.body.birthday,
            req.body.nickname,
        ]);
        if(result.affectedRows===1){
            output.success = true;
        } else {
            output.error = '無法新增會員';
        }
    } catch(ex){
        console.log(ex);
        output.error = 'Email 已被使用過';
    }

    res.json(output);
});


router.get('/account-check', async(req, res)=>{

    //{used: true}
    const sql = "SELECT `email` FROM members WHERE `email`=?";
    const [rs] = await db.query(sql,[req.query.email]);
    
    res.json({used: !! rs.length });
    

});




// 登出
router.get('/logout', (req, res)=>{
    res.json({});
});

module.exports = router;