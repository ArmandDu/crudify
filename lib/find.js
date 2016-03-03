'use strict';

var find = module.exports = exports = (function(crudify) {

  function find(req, res) {
    crudify._Model.find(function(err, models) {
      if (err) res.json({
        error: err
      });
      else res.json({
        result: models
      });
    });
  }
  return find;
});
