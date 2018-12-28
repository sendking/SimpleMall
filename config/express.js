/*
 * @Author: jhd
 * @Date: 2018-12-23 00:04:01
 * @Description: express 配置文件
 */
const express = require('express');
const bodyParser = require('body-parser');
// node中间件 对body进行解析
const session = require('express-session');
const morgan = require('morgan');
const router = require('../router/index');


const app = new express();

// true 对body解析可以进行任何数据类型的解析 false时只能解析string 和array类型
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// 设置session
app.use(session({
  secret: 'express_cookie',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000 * 60
  } //过期时间
  // 这里设置的过期时间与token有效时间保持一致
}));

// dev 显示console | pro 显示: file
app.use(morgan(process.env.NODE_ENV));


// 声明路由
app.use('/api', router);

module.exports = app;
// 将定义的express配置暴露出去