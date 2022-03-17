var db = require('../db');
var users = require('./users.js');

module.exports = {
  getAll: function (callback) {
    db.connection.query('SELECT m.id, m.body, users.username, rooms.name as roomname FROM messages m INNER JOIN users ON users.id = m.user_id INNER JOIN rooms ON rooms.id = m.room_id', (err, results, fields) => {
      callback(err, results);
    });
  }, // a function which produces all the messages
  create: function (data, callback) {

    users.create(data, (err, user) => {
      db.connection.query(`INSERT IGNORE INTO rooms VALUES (DEFAULT, "${data.roomname}")`, (err, result, fields) => {
        db.connection.query(`SELECT rooms.id FROM rooms WHERE rooms.roomname = "${data.roomname}"`, (err, room, fields) => {
          db.connection.query(`INSERT INTO messages VALUES (DEFAULT, "${data.message}", 1, ${user.id})`, (err, message, fields) => {
            callback(err, message[0]);
          });
        });
      });
    });




    // find whether user exist in users

    // db.connection.query(`SELECT users.id FROM users WHERE users.username = "${data.username}"`, (err, userId, fields) => {
    //   if (!userId.length) {
    //     // Create User
    //   } else {
    //     db.connection.query(`SELECT rooms.id FROM rooms WHERE rooms.name = "${data.name}"`, (err, roomId, fields) => {
    //       if (!roomId.length) {
    //         // Create Room
    //       } else {
    //         // db.connection.query(`INSERT INTO messages VALUES `)
    //         console.log('THIS IS WHERE WE ARE READY TO INSERT');
    //         console.log(userId);
    //         console.log(roomId);
    //       }
    //     });
    //   }
    // });


  }
};

