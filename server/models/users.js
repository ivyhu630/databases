var db = require('../db');

module.exports = {
  getAll: function (callback) {
    db.connection.query('SELECT * FROM users;', function(err, results, fields) {
      // console.log(results);
      callback(err, results);
    });
  },
  create: function (data, callback) {
    // console.log(data);
    db.connection.query(`INSERT IGNORE INTO users VALUES (DEFAULT, "${data.username}")`, (err, result, fields) => {
      db.connection.query(`SELECT users.id FROM users WHERE users.username = "${data.username}"`, (err, userId, fields) => {
        callback(err, userId[0]);
      });
    });
  }
};
