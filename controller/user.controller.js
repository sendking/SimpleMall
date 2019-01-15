/*
 * @Author: jhd
 * @Date: 2018-12-24 16:38:49
 * @Description: 用户控制器
 */

const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {
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
    responseClient(res, 202, '用户名不为空');
    next();
  } else if (!passWord) {
    responseClient(res, 202, '密码不可为空');
    next();
  } else {
    // 查询数据库中是否包含当前用户
    UserModel.findOne({
      userName: userName
    }).then(data => {
      if (data) {
        responseClient(res, 202, '用户名已存在');
        next();
      } else {
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
            responseClient(res, 201, '注册成功', data);
            next();
          })
        }).catch(err => {
          // 保存失败
          responseClient(res, 202, '注册失败,请重新注册', err);
          next();
        });
      };
    });
  }
}

/**
 * @msg: 用户登录接口
 * @param {req} Request 请求参数
 * @param {req} Response 相应参数
 * @param {next} 下一个中间件
 * 登陆验证用户成功 生成token并返回
 */
exports.Login = async (req, res, next) => {
  //获取参数
  let { userName, passWord } = req.body;
  try {
    // 查询用户
    let userInfo = await UserModel.findOne({
      userName,
      passWord: md5(passWord + MD5_SUFFIXSTR)
    });

    if (userInfo) {
      // 当前用户存在 生产token
      // jsonwebtoken的文档  https://github.com/auth0/node-jsonwebtoken
      const token = jwt.sign({
        name: userInfo.userName,
        userId: userInfo._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      }, 'simplemall');

      responseClient(res, 200, '登陆成功', { token: token });
      next();
    } else {
      // 查询不到
      responseClient(res, 201, '账号与密码不匹配');
      next();
    }
  } catch (err) {
    responseClient(res, 201, '服务器内部错误!');
    next();
  }
};

/**
 *  退出登陆
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.Logout = async (req, res, next) => {
  try {
    req.session.userName = null;
    responseClient(res, 200, '退出成功', null)
    next();
  } catch (err) {
    responseClient(res, 201, '退出失败', err);
    next();
  }
}

/**
 * @msg: 获取用户详细信息
 * @param {req} Request 请求参数
 * @param {req} Response 相应参数
 * @param {next} 下一个中间件
 */
exports.getUserInfo = async (req, res, next) => {
  if (req.session.userName) {
    // db.collection.findOne(query, projection)
    // query 可选，使用查询操作符指定查询选择标准。
    // projection 可选，指定的字段返回使用投影操作符。省略该参数返回匹配文档中所有字段。
    let userInfo = await UserModel.find({
      userName: req.session.userName
    }, '_id userName type description order').catch(err => {
      responseClient(res, 201, '服务器内部问题', userInfo);
      next();
    });
    if (userInfo) {
      responseClient(res, 200, '获取用户信息资料', userInfo);
      next();
    } else {
      responseClient(res, 201, '当前查询用户不存在', userInfo);
      next();
    }
  }
}
/**
 * @msg: 更新用户信息
 * @param {req} Request 请求参数
 * @param {res} Response 相应参数
 * @param {next} 下一个中间件
 */
exports.update = async (req, res, next) => {
  let { userName, passWord, description } = req.body;
  if(req.session.userName) {
    let updateUserInfo = await UserModel.update({
      userName: req.session.userName
    },{
      userName,
      passWord: md5(passWord + MD5_SUFFIXSTR),
      description
    }).catch(err => responseClient(res, 201, '服务器内部错误', err));
    if (updateUserInfo) {
      responseClient(res, 200, '更新成功', {});
      next();
    } else {
      responseClient(res, 201, '更新失败');
      next();
    }
  }
}

/**
 * @msg: 提升为管理员
 * @param {req} Request 请求参数
 * @param {res} Response 相应参数
 * @param {next} 下一个中间件
 */
exports.promoteAdmin = async (req, res, next) => {
  let { id } = req.body;
  let info = await UserModel.findOne({
    userName: req.session.userName
  }).catch(err => responseClient(res, 201, '服务器内部错误', err));
  if (info.type) {
    UserModel.update({ _id: id }, { type: true }).then(info => {
      responseClient(res, 200, '用户已提升为管理员',{});
      next();
    }).catch(err => responseClient(res, 201, '操作失败', err));
  } else {
    responseClient(res, 201, '您没有权限操作', null);
    next();
  }
}

/**
 * @msg: 获取用户列表
 * @param {req} Request 请求参数
 * @param {res} Response 相应参数
 * @param {next} 下一个中间件
 */
exports.userList = async (req, res, next) => {
  let {
    pageNum = 1
  } = req.query;
  let userList = await UserModel.paginate({},{pageNum, select: '_id userName type description order'}).catch(err => responseClient(res, 201, '服务器内部错误', err))
  let data = {
    data: userList.docs,
    pageTotal: userList.pages,
    totalNum: userList.page
  };
  responseClient(res, 200, '查询成功', data);
  next();
}