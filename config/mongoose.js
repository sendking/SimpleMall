/*
 * @Author: jhd
 * @Date: 2018-12-23 00:22:42
 * @Description: mongoose的相关配置项
 */
var mongoose = require('mongoose');

const mongodbUrl = 'mongodb://0.0.0.0:27017/simplemall';

mongoose.Promise = Promise;

// mongodb 链接错误的异常处理
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

exports.connect = () => {
  console.log(`Connecting to mongo @: ${mongodbUrl}`);
  mongoose.connect(mongodbUrl, {
    useNewUrlParser: true
  });
  return mongoose.connection;
};

exports.disconnect = () => {
  mongoose.disconnect(() => {
    console.log(`disconnect : ${mongodbUrl}`);
  });
}

