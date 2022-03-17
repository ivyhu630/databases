var db = require('../db');

module.exports = {
  getAll: function () {
    db.connection.query('SELECT * FROM users;', function(err, results, fields) {
      console.log(results);
    });
  },
  create: function () {}
};
