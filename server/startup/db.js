const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
  const db = process.env.DB_LOCAL;
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      autoIndex : false
    })
    .then(() => {
      winston.log("info", 'db connection successful!');
    });
}

