var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.messages.getAll((err, results) =>{
      if (err) {
        console.log(err);
      } else {
        res.status(201);
        console.log(results);
        res.end(JSON.stringify(results));
      }
    });
  },
  post: function (req, res) {
    models.messages.create(req.body, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201);
        res.end(JSON.stringify(results));
      }
    });
  }
};
