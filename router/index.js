const express = require("express");
const UserController = require("../controller/user");
const { responseClient } = require("../util");
const jwt = require("jsonwebtoken");

const Router = express.Router({
  mergeParams: true
});

Router.all("*", (req, res, next) => {
  if (req.headers.token) {
    try {
      const decodedToken = jwt.verify(req.headers.token, "simplemall");
      if (decodedToken.exp > Math.floor(Date.now() / 1000)) {
        if (
          req.session.userName &&
          req.session.userName === decodedToken.name
        ) {
          next();
        } else {
          req.session.userName = decodedToken.name;
          next();
        }
      } else {
        responseClient(res, 101, "登录超时，请重新登录", null);
        next();
      }
    } catch (err) {
      responseClient(res, 102, "token失效，重新登录", null);
      next();
    }
  } else if (
    req.originalUrl.includes("login") ||
    req.originalUrl.includes("register")
  ) {
    next();
  } else {
    responseClient(res, 103, "来者何人！", null);
  }
});

// 用户注册
Router.post("/register", UserController.Register);

// 用户登陆
Router.post("/login", UserController.Login);

// 退出登录
Router.post("/logout", UserController.Logout);
// 用户信息获取
Router.get("/userinfo", UserController.getUserInfo);
module.exports = Router;
