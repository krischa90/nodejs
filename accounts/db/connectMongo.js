
module.exports = function (success, error) {
    // 1. 安装 mongoose
    // 2. 导入 mongoose

    const mongoose = require('mongoose');
    // 3. 链接 mongodb 服务
    // mongodb protocol, connect to url, db name
    // 导入 配置文件
    const {DBHOST, DBPORT, DBNAME} = require('../config/config.js');
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    // 4. 设置 callback fun
    mongoose.connection.on('open', async () => {
        success();
    }); // 设置链接成功的 callback

    mongoose.connection.on('error', () => {
        error();
    }); // 设置链接成功的 callback

    mongoose.connection.on('close', () => {
        console.log('close connection!');
    }); // 设置链接关闭的 callback
}

