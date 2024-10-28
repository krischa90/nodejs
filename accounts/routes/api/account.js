var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const AccountModel = require('../../models/AccountModel.js');

// 声明中间件
let checkTokenMiddleware = (req, res, next) => {
  let token = req.get('token');
  if (!token) {
    return res.json({
      code: '2003',
      // res msg
      msg: 'token 缺失',
      // res data
      data: null
    });
  }
  // 校验 token
  jwt.verify(token, 'atguigu', (err, data) => {
    console.log(token);
    if (err) {
      return res.json({
        code: '1005',
        msg: '失败！！！',
        data: null
      });
    }
    // 如果校验成功
    next();
  });
}

/* GET home page. */
router.get('/account', checkTokenMiddleware, async function (req, res, next) {
  // 读取 collections 信息
  try {
    const data = await AccountModel.find().sort({ amount: -1 });
    // res.render('list', {data: data});

    // API response
    res.json({
      // status code, 0 表示成功，非 0 表示失败
      code: '0000',
      // res msg
      msg: '成功！！！',
      // res data
      data: data
    });
  } catch (err) {
    res.status(500).json({
      code: '1001',
      msg: '失败！！！',
      data: null
    });
  }
});

/* Post home page. */
router.post('/account', checkTokenMiddleware, async function (req, res, next) {
  try {
    // 插入數據庫
    const data = await AccountModel.create({ ...req.body });
    res.json({
      code: '0000',
      // res msg
      msg: '成功！！！',
      // res data
      data: data
    });
  } catch (error) {
    res.status(500).json({
      code: '1001',
      msg: '失败！！！',
      data: null
    });
  }
});

/* Delete */
router.delete('/account/:id', checkTokenMiddleware, async function (req, res, next) {
  let id = req.params.id;
  try {
    await AccountModel.deleteOne({_id: id});
    res.json({
      code: '0000',
      // res msg
      msg: '成功！！！',
      // res data
      data: id
    });
  } catch(error) {
    res.status(500).json({
      code: '1001',
      msg: '失败！！！',
      data: null
    });
  }
});

/* get one record */
router.get('/account/:id', checkTokenMiddleware, async function (req, res, next) {
  let id = req.params.id;
  try {
    const data = await AccountModel.findById(id);
    res.json({
      code: '0000',
      // res msg
      msg: '成功！！！',
      // res data
      data: data
    });
  } catch(error) {
    res.status(500).json({
      code: '1001',
      msg: '失败！！！',
      data: null
    });
  }
});

/* update */
router.put('/account/:id', checkTokenMiddleware, async function (req, res, next) {
  let id = req.params.id;
  try {
    const data = await AccountModel.updateOne({_id: id}, req.body);

    res.json({
      code: '0000',
      // res msg
      msg: '成功！！！',
      // res data
      data: data
    });
  } catch(error) {
    res.status(500).json({
      code: '1001',
      msg: '失败！！！',
      data: null
    });
  }
});

module.exports = router;
