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
    // console.log('Request body:');
    // console.log(req.body);

    models.users.create(req.body, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201);
        // console.log("this is " + results);
        res.end(JSON.stringify(results));
      }
    });
  }
};
