const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = new express();
const session = require("express-session");
const router = require("../router");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use("/api", router);
app.use(morgan(process.env.NODE_ENV));
app.use(
  session({
    secret: "express_cookie",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 1000 * 60
    } //过期时间
    // 这里设置的过期时间与token有效时间保持一致
  })
);

module.exports = app;
