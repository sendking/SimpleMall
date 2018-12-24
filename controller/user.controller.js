/*
 * @Author: jhd
 * @Date: 2018-12-24 16:38:49
 * @Description: 用户控制器
 */

var UserModel = require('../models/user.model');
var jwt = require('jsonwebtoken');
var {
  responseClient,
  md5,
  MD5_SUFFIXSTR
} = require('../util/util');


/**
 * @msg: 用户注册接口
 * @param {req} Request 请求参数
 * @param {req} Response 相应参数
 * @param {next} 下一个中间件
 */
exports.Register = async (req, res, next) => {
  let {
    userName,
    passWord,
    type = false
  } = req.body;

  // 条件判断
  if (!userName) {
    responseClient(res, 200, 202, '用户名不为空')
  } else if (!passWord) {
    responseClient(res, 200, 202, '密码不可为空')
  }
  // 查询数据库中是否包含当前用户
  UserModel.findOne({
    userName: userName
  }).then(data => {
    if (data) {
      responseClient(res, 200, 202, '用户名已存在');
      next();
    }
    // 定义新用户数据结构
    let user = new UserModel({
      userName: userName,
      passWord: md5(passWord + MD5_SUFFIXSTR),
      type: type,
      description: '',
      order: ''
    });
    // 讲用户保存到数据库
    user.save().then(() => {
      UserModel.findOne({
        userName: userName
      }).then(userInfo => {
        // 保存成功
        let data = {
          userName: userInfo.userName,
          userType: userInfo.type,
          userId: userInfo._id
        }
        // 接口返回
        responseClient(res, 200, 201, '注册成功', data);
        next();
      })
    }).catch(err => {
      // 保存失败
      responseClient(res, 500, 202, '注册失败,请重新注册', err);
      next();
    });
  });
}