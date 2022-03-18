var db = require('../db');
var users = require('./users.js');

module.exports = {
  getAll: function (callback) {
    db.connection.query('SELECT m.id, m.body, users.username, rooms.name as roomname FROM messages m INNER JOIN users ON users.id = m.user_id INNER JOIN rooms ON rooms.id = m.room_id', (err, results, fields) => {
      callback(err, results);
    });
  },
  create: function (data, callback) {
    users.create(data, (err, user) => {
      db.connection.query(`INSERT IGNORE INTO rooms VALUES (DEFAULT, "${data.roomname}")`, (err, result, fields) => {
        db.connection.query(`SELECT rooms.id FROM rooms WHERE rooms.name = "${data.roomname}"`, (err, room, fields) => {
          db.connection.query(`INSERT INTO messages VALUES (DEFAULT, "${data.message}", ${room[0].id}, ${user.id})`, (err, message, fields) => {
            callback(err, message[0]);
          });
        });
      });
    });


  }
};

