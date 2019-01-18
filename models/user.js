const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const UserModel = mongoose.model(
  "User",
  mongoose
    .Schema({
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
    .plugin(mongoosePaginate)
);

module.exports = UserModel;
