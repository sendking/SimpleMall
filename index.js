const app = require("./config/express");
const mongoose = require("./config/mongoose");
mongoose.connect();

app.get("/", function(req, res, nuxt) {
  res.send("hello word");
});

app.listen(3000, console.log(`node start 3000`));
