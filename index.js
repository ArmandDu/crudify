'use strict;'


module.exports = exports = (function() {

  var utils = require('./lib/utils');

  /*
   ** using user's express version. Hopping Router will always be there
   ** maybe give router instead? Or any better practice?
   **
   ** Parameters: express instance, mongoose model instance
   **
   ** function
   */

  function Crudify(express, model, options) {
    this._express = express;
    this._Model = model;
    this._router = this._express.Router();
    this._options = utils.setConfig(options, this);
    this._options.middlewares.forEach(function(middleware) {
      this._router.use(middleware);
    });
    utils.route(this._router, this._options)
      .post('/', 'store')
      .get('/', 'find')
      .get('/:id', 'findOne')
      .put('/:id', 'update')
      .delete('/:id', 'destroy');
  }

  Crudify.prototype.Router = function() {
    return this._router;
  }

  return Crudify;
})();
