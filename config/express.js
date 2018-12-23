const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const env = process.env.NODE_ENV;
const app = new express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(morgan(env));
module.exports = app;
