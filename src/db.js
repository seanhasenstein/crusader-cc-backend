const mongoose = require('mongoose');
const options = require('./config');

const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(url, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true
  });
};

module.exports = connect;
