const mongoose = require("mongoose");
const DB_URL = "mongodb://0.0.0.0:27017/simplemall";
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose connection open to " + DB_URL);
});

db.on("error", err => {
  console.log("Mongoose connection error: " + err);
  process.exit(-1);
});

db.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});

exports.connect = () => {
  mongoose.connect(DB_URL);
};
