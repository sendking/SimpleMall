/*
 * @Author: jhd
 * @Date: 2018-12-24 17:11:11
 * @Description: 路由
 */
const express = require('express');
const UserController = require('../controller/user.controller');
const { responseClient } = require('../util/util');
const jwt = require('jsonwebtoken');

let Router = express.Router({
  mergeParams: true
});

// 拦截器
Router.all('*', (req, res, next) => {
  /**
   * token验证
   *  前端在退出登陆后应当删除缓存的token，保持前后端token的有效性
   */

  // 请求参数中包含token
  if (req.query.token) {
    try {
      const decodedToken = jwt.verify(req.query.token, 'simplemall')
      if (decodedToken.exp > Math.floor(Date.now() / 1000)) {
        // token解码正确 时间未过期 并且session中包含userName
        if (req.session.userName && req.session.userName === decodedToken.name) {
          next()
        } else {
          // token解码正确 时间未过期 但是session中不包含userName
          req.session.userName = decodedToken.name
          next()
        }
      } else {
        // token解码正确 但是时间过期
        responseClient(res, 101, '登陆超时，请重新登陆', null)
        next()
      }
    } catch (err) {
      // 解码失败
      responseClient(res, 102, 'token失效，请重新登陆', null)
      next()
    }
  } else if (req.originalUrl.indexOf('login') > 0 || req.originalUrl.indexOf('register') > 0 ) {
    // 过滤登陆 注册 接口
    next()
  } else {
    // 未传递token
    responseClient(res, 103, '来者何人！', null)
    next()
  }
})
/**
 * 用户注册
 */
Router.post('/register', UserController.Register);

/**
 * 用户登录
 */
Router.post('/login', UserController.Login);

/**
 * 退出登陆
 */
Router.post('/logout', UserController.Logout);

/**
 * 获取用户信息
 */
Router.get('/userinfo', UserController.getUserInfo);


module.exports = Router;
