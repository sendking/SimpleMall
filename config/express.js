/*
 * @Author: jhd
 * @Date: 2018-12-23 00:04:01
 * @Description: express 配置文件
 */
const express = require('express');
const bodyParser = require('body-parser');
// node中间件 对body进行解析
const morgan = require('morgan');
const router = require('../router/index');


const logs = 'dev';
const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// true 对body解析可以进行任何数据类型的解析 false时只能解析string 和array类型

// dev 显示console | pro 显示: file
app.use(morgan(logs));


// 声明路由
app.use('/api', router);

module.exports = app;
// 将定义的express配置暴露出去