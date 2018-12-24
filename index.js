require('babel-register');
const config = require('./config/config');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

mongoose.connect();

app.listen(config.PORT, () => console.log(`server started on port ${config.PORT}`));