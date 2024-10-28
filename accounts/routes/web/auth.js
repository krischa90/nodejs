var express = require('express');
const UserModel = require('../../models/UserModel');
const md5 = require('md5');
var router = express.Router();

// 注册
router.get('/reg', (req, res) => {
    // 响应 HTML
    res.render('reg');
});

// 注册用户
router.post('/reg', async (req, res) => {
    try {
        // 插入數據庫
        const data = await UserModel.create({ ...req.body, password: md5(req.body.password) });
        res.render('success', {msg: '注册成功', url: '/login'});
    } catch (error) {
        res.status(500).json({
            code: '1001',
            msg: '失败！！！',
            data: null
        });
    }
});

router.get('/login', (req, res) => {
    // 响应 HTML
    res.render('login');
});

// 登录
router.post('/login', async (req, res) => {
    let {username, password} = req.body;
    try {
        // 查询數據庫
        const data = await UserModel.findOne({username: username, password: md5(password)});
        if (data != null) {
            console.log(req.session);
            req.session.username = data.username;
            req.session._id = data._id;
            res.render('success', {msg: '登录成功！！！', url: '/account'});
        } else {
            res.status(400).render('error', {
                message: '用户名或密码错误！',
                error: {status: 401, stack: ''}
            });
        }
    } catch (error) {
        res.status(500).json({
            code: '1001',
            msg: '失败！！！',
            data: null
        });
    }
});

// 推出登录
router.get('/logout', (req, res) => {
    // 销毁 session
    req.session.destroy(() => {
        res.render('success', {msg: '退出成功！！！', url: '/login'});
    });
});

module.exports = router;
