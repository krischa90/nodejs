var express = require('express');
var router = express.Router();
// import lowdb
const AccountModel = require('../../models/AccountModel.js');

const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware.js');
// GET db obj
// const db = low(adapter);

const shortid = require('shortid');

/* GET home page. */
router.get('/', checkLoginMiddleware, function(req, res) {
  res.redirect('/account');
});

/* GET home page. */
router.get('/account', checkLoginMiddleware, async function(req, res, next) {
  // let accounts = db.get('accounts').value();
  // 读取 collections 信息
  try {
    const data = await AccountModel.find().sort({amount: -1});
    res.render('list', {data: data});
  } catch(err) {
    res.status(500).send('失败');
  }
});

/* Post home page. */
router.post('/account', checkLoginMiddleware, async function (req, res, next) {
  try {
    // 插入數據庫
    AccountModel.create({ ...req.body });
    res.render('success', { msg: '添加成功!', url: '/account' });
  } catch (error) {
    res.status(500).send('插入失败！');
    return;
  }
});

/* Delete */
router.get('/account/:id', checkLoginMiddleware, async function (req, res, next) {
  let id = req.params.id;
  try {
    await AccountModel.deleteOne({_id: id});
    res.render('success', {msg: '删除成功！', url:'/account'});
  } catch(error) {
    res.status(500).send('删除失败！！！');
    return;
  }
});

/* GET create page. */
router.get('/create', checkLoginMiddleware, function(req, res, next) {
  res.render('create');
});

module.exports = router;
