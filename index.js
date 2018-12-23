require('babel-register');
const port = 3000;
const app = require('./config/express');
const mongoose = require('./config/mongoose');

mongoose.connect();

app.listen(port, () => console.log(`server started on port ${port}`));