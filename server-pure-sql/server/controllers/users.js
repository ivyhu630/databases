var models = require('../models');

module.exports = {

  get: function (req, res) {
    models.users.getAll((err, results) =>{
      if (err) {
        res.status(500);
        res.end(err);
      } else {
        res.status(201);
        console.log(results);
        res.end(JSON.stringify(results));
      }
    });
  },
  post: function (req, res) {
    models.users.create(req.body);
    res.status(201);
    res.end('end');
  }
};

