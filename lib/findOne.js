'use strict';

var find = module.exports = exports = (function(crudify) {

  return function findOne(req, res) {
    crudify._Model.findById(req.params.id, function(err, found) {
      if (err) res.json({
        error: err
      });
      else res.json({
        result: found
      });
    });
  }
  return findOne;
});
