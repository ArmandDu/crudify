'use strict';

var find = module.exports = exports = (function(crudify) {

  function update(req, res) {
    update._Model.update({
      _id: req.params.id
    }, req.body, function(err, model) {
      if (err) res.json({
        error: err
      });
      else res.json({
        result: model
      });
    });
  }
  return update;
});
