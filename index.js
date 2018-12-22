var express = require("express");
// 引入express

const app = new express();
// 实例 express

app.get('/', function(req, res, nuxt){
    res.send('hello word')
})

app.listen(3000, console.log(`node start 3000`))
