var models = require('../models');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

module.exports = {
  get: function (req, res) {
    var users = models.users.getAll();
    res.status(201);
    res.end(users);
  },
  post: function (req, res) {

    // Parse out the data for the request

    // Check to see if the user already exists
      // If not, create a new user
      // models.users.create();
    // Check to see if the room already exists
      // If not, create a new room
      // models.rooms.create()
    // Create a message referencing the user and room
    // models.messages.create()
    // If all are successful
      // Return with a status code of 201
    // Otherwise
      // Return with an error status code.

    req.on('data', message => {
      var message = JSON.parse(message);
    });
    res.status(201);
    res.send('message received');
    res.end(JSON.stringify(message));
  }


};
