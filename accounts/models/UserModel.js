// 导入 mongoose 
const mongoose = require('mongoose');

// 5. 创建 collections 中文档属性
let UserSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      }
});
// 6. 创建Collections 模型对象 对文档操作的封装对象
let UserModel = mongoose.model('users', UserSchema);

// 暴露对象
module.exports = UserModel;