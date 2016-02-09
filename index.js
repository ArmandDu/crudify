'use strict;'

/*
** using user's express version. Hopping Router will always be there
** maybe give router instead? Or any better practice?
**
** Parameters: express instance, mongoose model instance
**
** function
*/

function Crudify(express, model) {
  this.express = express;
  this.Model = model;
  this.router = express.Router();
  this.router.get('/', find)
            .get('/:id', findOne)
            .post('/', store)
            .put('/:id', update)
            .delete('/:id', destroy);

  var self = this;
  function find(req, res) {
    self.Model.find(function(err, models) {
      if (err) res.json({error: err});
      else res.json({result: models});
    });
  }

  function findOne(req, res) {
    self.Model.findById(req.params.id, function(err, model) {
      if (err) res.json({error: err});
      else res.json({result: model});
    });
  }

  function store(req, res) {
    var model = new self.Model(req.body);
    model.save(function (err) {
      if (err) res.json({error: err})
      else res.json({result: model});
    });
  }

  function update(req, res) {
    self.Model.update({_id : req.params.id}, req.body, function(err, model) {
      if (err) res.json({error: err});
      else res.json({result: model});
    });
  }

  function destroy(req, res) {
    self.Model.remove({_id:req.params.id}, function(err, model) {
      if (err) res.json({error: err});
      else res.json({model});
    });
  }
}

Crudify.prototype.Router = function() {
  return this.router;
}

module.exports = Crudify;
