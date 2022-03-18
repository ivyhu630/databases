var db = require('../db');

module.exports = {

  getAll: function () {
    return db.User.findAll();
  },

  create: function(data) {
    return db.User.create({username: data.username});
  }
};