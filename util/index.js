/*
 * @Author: jhd
 * @Date: 2018-12-24 16:43:52
 * @Description: 公用方法
 */

// 用于加密
const crypto = require('crypto');
const config = require('../config/config');

// 用于生成token
const jwt = require('jsonwebtoken');

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
   * @param {Number} code  201 202
   */
  responseClient: function responseClient(res, httpCode = 500, code = 202, message = '服务端异常', data = {}) {
    let responseData = {};
    responseData.code = code;
    responseData.message = message;
    responseData.data = data;
    res.status(httpCode).json(responseData)
  }
};