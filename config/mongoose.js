/*
 * @Author: jhd
 * @Date: 2018-12-23 00:22:42
 * @Description: mongoose的相关配置项
 */
const mongoose = require('mongoose');

const config = require('./config');

mongoose.Promise = Promise;

// mongodb 链接错误的异常处理
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

exports.connect = () => {
  console.log(`Connecting to mongo @: ${config.DB_URL}`);
  mongoose.connect(config.DB_URL, {
    useNewUrlParser: true
  });
  return mongoose.connection;
};

exports.disconnect = () => {
  mongoose.disconnect(() => {
    console.log(`disconnect : ${config.DB_URL}`);
  });
}

