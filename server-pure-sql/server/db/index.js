
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '', {
  dialect: 'mysql'
});

var User = db.define('user', {
  username: Sequelize.STRING
});

var Message = db.define('message', {
  userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

exports.User = User;
exports.Message = Message;

// var mysql = require('mysql2');

// module.exports = {
//   connection: mysql.createConnection({
//     user: 'root',
//     database: 'chat'
//   })
// };



