'use strict';

var find = module.exports = exports = (function(crudify) {

  function store(req, res) {
    crudify._Model.create(req.body, function(err, created) {
      if (err) res.json({
        error: err
      })
      else res.json({
        result: created
      });
    });
  }
  return store;
});
