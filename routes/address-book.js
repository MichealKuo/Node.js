const express = require('express');
const db = require('./../modules/connect-mysql');
const upload = require('./../modules/upload-images');

const router = express.Router();

router.get('/', (req, res)=>{
    res.render('address-book/main');
});

router.get('/list', async (req, res)=>{
    res.locals.pageName = 'ab-list';
    const perPage = 5;
    let page = parseInt(req.query.page) || 1;
    const output = {

    };

    const t_sql = "SELECT COUNT(1) totalRows FROM address_book ";
    const [[{totalRows}]] = await db.query(t_sql);
    output.totalRows = totalRows;
    output.totalPages = Math.ceil(totalRows/perPage);
    output.perPage = perPage;
    output.rows = [];
    output.page = page;

    // 如果有資料才去取得分頁的資料
    if(totalRows > 0){
        if(page < 1){
            return res.redirect('?page=1');
        }
        if(page > output.totalPages){
            return res.redirect('?page=' + output.totalPages);
        }

        const sql = `SELECT * FROM \`address_book\` ORDER BY sid DESC LIMIT ${(page-1)*perPage}, ${perPage}`;
        const [rows] = await db.query(sql)
        output.rows = rows;

    }

    // res.json(output);
    res.render('address-book/list', output);
});


router.delete('/delete/:sid([0-9]+)', async (req, res)=>{
    const sql = "DELETE FROM address_book WHERE sid=?";

    const [r] = await db.query(sql, [req.params.sid]);
    console.log({r});
    res.json(r);
});

router.route('/add')
    .get(async (req, res)=>{
        res.locals.pageName = 'ab-add';
        res.render('address-book/add');
    })
    .post(async (req, res)=>{
        // TODO: 欄位檢查
        const output = {
            success: false,
        }

        //方法1
        // const sql = "INSERT INTO `address_book`(" +
        //     "`name`, `email`, `mobile`, `birthday`, `address`, `created_at`) VALUES (?, ?, ?, ?, ?, NOW())";

        // const [result] = await db.query(sql, [
        //     req.body.name,
        //     req.body.email,
        //     req.body.mobile,
        //     req.body.birthday,
        //     req.body.address,
        // ]);

        //...req.body 先展開 ＝>name`, `email`, `mobile`, `birthday`, `address`  + created_at: new Date()
        
        const input = {...req.body, created_at: new Date()};
        const sql = "INSERT INTO `address_book` SET ?";
        const [result] = await db.query(sql,[input]);

        output.result = result;
        if(result.affectedRows && result.insertId){
            output.success = true;
        }

        console.log({result});
        /*
        {
          result: ResultSetHeader {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 148,
            info: '',
            serverStatus: 2,
            warningStatus: 0
          }
        }
         */

        res.json(output);
    });



module.exports = router;