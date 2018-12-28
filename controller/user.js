const UserModel = require("../models/user");
const { responseClient, md5, MD5_SUFFIXSTR } = require("../util");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res, next) => {
  const { userName, passWord, type = false } = req.body;
  if (!userName) {
    responseClient(res, 202, "用户名不为空");
  }
  if (!passWord) {
    responseClient(res, 202, "密码不为空");
  }
  try {
    let findUser = await UserModel.findOne({ userName });
    if (findUser) {
      responseClient(res, 202, "用户名已存在");
      next();
    } else {
      const user = new UserModel({
        userName,
        passWord: md5(passWord + MD5_SUFFIXSTR),
        type,
        description: "", //TODO:
        order: "" // TODO:
      });
      await user.save();
      let userInfo = await UserModel.findOne({ userName });
      let data = {
        userName: userInfo.userName,
        userType: userInfo.type,
        userId: userInfo._id
      };
      responseClient(res, 201, "注册成功", data);
      next();
    }
  } catch (err) {
    responseClient(res, 202, "注册失败,请重新注册", err);
    next();
  }
};

exports.Login = async (req, res, next) => {
  const { userName, passWord } = req.body;
  // TODO: 塞到cookie里
  try {
    if (
      await UserModel.findOne({
        userName,
        passWord: md5(passWord + MD5_SUFFIXSTR)
      })
    ) {
      const token = jwt.sign(
        {
          name: userName,
          passWord,
          exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        "simplemall"
      );
      responseClient(res, 200, "登陆成功", { token });
      next();
    } else {
      responseClient(res, 201, "账号密码不匹配或账号不存在");
      next();
    }
  } catch (error) {
    responseClient(res, 201, "服务器内部错误");
    next();
  }
};

exports.Logout = async (req, res, next) => {
  try {
    req.session.userName =null;
    responseClient(res, 201, '退出成功', null)
  } catch (err) {
    responseClient(res, 201, '退出失败', err)
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    if (req.session.userName) {
      if (
        await UserModel.findOne({
          userName: req.session.userName
        })
      ) {
        responseClient(res, 200, "获取信息成功", userInfo);
        next();
      } else {
        responseClient(res, 201, "用户不存在", userInfo);
        next();
      }
    }
  } catch (error) {
    responseClient(res, 201, "服务器内部错误");
    next();
  }
};
