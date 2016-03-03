'use strict';

var find = module.exports = exports = (function(crudify) {

  function destroy(req, res) {
    destroy._Model.remove({
      _id: req.params.id
    }, function(err, model) {
      if (err) res.json({
        error: err
      });
      else res.json({
        model
      });
    });
  }
  return destroy;
});
