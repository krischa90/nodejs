// 导入 mongoose 
const mongoose = require('mongoose');

// 5. 创建 collections 中文档属性
let BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // 该属性必须不为空
    },
    author: String,
    price: Number,
    style: {
        type: String,
        enum: ['宴请', '城市', '男女']
    }
});
// 6. 创建Collections 模型对象 对文档操作的封装对象
let BookModel = mongoose.model('books', BookSchema);

// 暴露对象
module.exports = BookModel;