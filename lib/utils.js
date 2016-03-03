'use strict';

module.exports = exports = (function() {

  function setMethods(options, name, func) {
    return {
      enable: options && options[name] && (typeof options[name].enable !== 'undefined') ?
        options[name].enable : true,
      function: options && options[name] && (typeof options[name].function !== 'undefined') ?
        options[name].function : func,
      middlewares: options && options[name] && options[name].middlewares || []
    }
  }

  function setMiddlewares(options) {
    return (options && options.middlewares && options.middlewares.length ?
      options.middlewares : []);
  }

  function routeMethod(router, method, path, options, name) {
    if (options[name].enable && ['get', 'post', 'put', 'delete'].indexOf(method) !== -1) {
      return router[method](path, options[name].function);
    }
  }

  function route(router, options) {
    var routes = {
      get: doGet,
      post: doPost,
      put: doPut,
      delete: doDelete
    }

    function doGet(path, name) {
      routeMethod(router, 'get', path, options, name);
      return routes;
    }

    function doPost(path, name) {
      routeMethod(router, 'post', path, options, name);
      return routes;
    }

    function doPut(path, name) {
      routeMethod(router, 'put', path, options, name);
      return routes;
    }

    function doDelete(path, name) {
      routeMethod(router, 'delete', path, options, name);
      return routes;
    }

    return routes;
  }

  function config(options, crudify) {
    return {
      middlewares: setMiddlewares(options),
      find: setMethods(options, 'find', require('./find')(crudify)),
      findOne: setMethods(options, 'findOne', require('./findOne')(crudify)),
      store: setMethods(options, 'store', require('./store')(crudify)),
      update: setMethods(options, 'update', require('./update')(crudify)),
      destroy: setMethods(options, 'destroy', require('./destroy')(crudify))
    };
  }

  return {
    setConfig: config,
    route: route,
    _setMethods: setMethods,
    _setMiddlewares: setMiddlewares,
    _routeMethod: routeMethod
  }
})();
