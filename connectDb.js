const mongoose = require('mongoose');

const connectDb = function (url) {
  return mongoose.connect(url);
};
module.exports = connectDb;
