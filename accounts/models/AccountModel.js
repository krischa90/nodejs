// 导入 mongoose 
const mongoose = require('mongoose');

// 5. 创建 collections 中文档属性
let AccountSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      email: String,
      "type": {
        type: String,
        enum: ['支出', '收入']
      },
      amount: String,
      memo: String
});
// 6. 创建Collections 模型对象 对文档操作的封装对象
let AccountModel = mongoose.model('accounts', AccountSchema);

// 暴露对象
module.exports = AccountModel;