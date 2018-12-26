/*
 * @Author: jhd
 * @Date: 2018-12-24 17:11:11
 * @Description: 路由
 */
const express = require('express');
const UserController = require('../controller/user.controller');

let Router = express.Router({
  mergeParams: true
});

/**
 * 用户注册
 */
Router.post('/register', UserController.Register);

/**
 * 用户登录
 */
Router.post('/login', UserController.Login);

/**
 * 获取用户信息
 */
Router.get('/userinfo', UserController.getUserInfo);


module.exports = Router;
