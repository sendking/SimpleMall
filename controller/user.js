const UserModel = require("../models/user");
const { responseClient, md5, MD5_SUFFIXSTR } = require("../util");

exports.Register = async (req, res, next) => {
  const { userName, passWord, type = false } = req.body;
  if (!userName) {
    responseClient(res, 202, "用户名不为空");
  }
  if (!passWord) {
    responseClient(res, 202, "密码不为空");
  }
  try {
    let findUser = await UserModel.findOne({userName})
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
      let userInfo = await UserModel.findOne({userName})
      let data = {
        userName: userInfo.userName,
        userType: userInfo.type,
        userId: userInfo._id
      }
      responseClient(res, 201, "注册成功", data);
      next();
    }
  } catch (err) {
    responseClient(res, 202, "注册失败,请重新注册", err);
    next();
  }
};
