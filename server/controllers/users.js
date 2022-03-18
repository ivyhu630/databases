var models = require('../models');

module.exports = {

  get: function (req, res) {
    models.users.getAll()
      .then((results) => {
        res.status(201);
        res.end(JSON.stringify(results));
      });

  },
  post: function (req, res) {
    models.users.create(req.body)
      .then(()=> {
        res.status(201);
        res.end('end');
      });
  }
};

