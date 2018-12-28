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
    secret: "express_session",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 1000 * 60 //TODO:
    }
  })
);
module.exports = app;
