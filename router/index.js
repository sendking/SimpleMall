const express = require("express");
const UserController = require("../controller/user");
const Router = express.Router({
  mergeParams: true
});

// 用户注册

Router.post("/register", UserController.Register);

module.exports = Router;
