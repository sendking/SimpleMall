/*
 * @Author: jhd
 * @Date: 2018-12-24 15:54:23
 * @Description: file content
 */

const mongoose = require('mongoose');
// 分页
const mongoosePaginate = require('mongoose-paginate');
/**
 * @msg: 用户表结构
 * @param {userName} 用户名
 * @param {passWord} 密码
 * @param {type} 用户类型 ==> 管理员，普通用户
 * @param {description} 用户描述
 * @param {order} 用户关联订单表 
 */
const User = mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
    max: 18,
    min: 3
  },
  passWord: {
    type: String,
    trim: true,
    required: true,
    max: 20,
    min: 6
  },
  type: {
    type: Boolean
  },
  description: {
    type: String,
  },
  order: {
    type: String,
  }
});
// 添加分页插件
User.plugin(mongoosePaginate);
const UserModel = mongoose.model('User', User);
module.exports = UserModel;