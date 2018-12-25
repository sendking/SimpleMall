const mongoose = require("mongoose");

const UserModel = mongoose.model(
  "User",
  mongoose.Schema({
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
      type: String
    },
    order: {
      type: String
    }
  })
);
module.exports = UserModel;
