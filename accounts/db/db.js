// 导入 connectMongojs 
const db = require('./connectMongo.js');
// 导入 mongoose
const mongoose = require('mongoose');
// 导入 BookModel
const BookModel = require('../models/BookModel');

// 调用函数
db(async () => {
    console.log('success');
    
    // 7. 创建 Collections
    try {
        const data = await BookModel.create({
            name: '西游记',
            author: 'wuchengen',
            price: 19.9,
            style: '宴请'
        });
        console.log(data);
    } catch (error) {
        console.log('failure!!!');
    }
}, () => {
    console.log('FAILURE');
});
