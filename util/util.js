/*
 * @Author: jhd
 * @Date: 2018-12-24 16:43:52
 * @Description: 公用方法
 */

// 用于加密
var crypto = require('crypto');
var config = require('../config/config');

// 用于生成token
var jwt = require('jsonwebtoken');

module.exports = {
  md5: (pwd) => {
    let md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex');
  },
  MD5_SUFFIXSTR: config.MD5_SUFFIXSTR,
  /**
   * response
   * @param {Object} res response
   * @param {Number} httpCode 400 500 200 http状态吗
   * @param {Number} code  -1:登陆超时 0:成功 1: 失败 2:验证失败  3:服务器错误
   */
  responseClient: function responseClient(res, httpCode = 500, code = 3, message = '服务端异常', data = {}) {
    let responseData = {};
    responseData.code = code;
    responseData.message = message;
    responseData.data = data;
    res.status(httpCode).json(responseData)
  }
};
