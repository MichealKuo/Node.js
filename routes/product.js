const express = require('express');
// const db = require('./../modules/connect-mysql');
const upload = require('./../modules/upload-images');
const Product = require('./../models/Product')
const router = express.Router();

// 列表
router.get('/', async (req, res) => {

});

// 讀取單筆
router.get('/:id', async (req, res) => {
    const output = {
        success: false,
        // status: '',
        // statusCode: 0,
        data: null,
    };
    const r = await Product.readOne(req.parmas.id);
    if(output.data) {
        output.success = true;
    }
    res.json(output);
});

// 新增
router.post('/', async (req, res) => {

});

// 修改
router.put('/:id', async (req, res) => {

});

// 刪除
router.delete('/:id', async (req, res) => {

});


module.exports = router;