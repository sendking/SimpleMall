const express = require("express");
const UserController = require("../controller/user");
const Router = express.Router({
  mergeParams: true
});

// 用户注册
Router.post("/register", UserController.Register);

// 用户登陆
Router.post('/login', UserController.Login);

// 用户信息获取
Router.get('/userinfo', UserController.getUserInfo)
module.exports = Router;
