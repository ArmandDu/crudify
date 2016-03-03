'use strict';

var should = require('chai').Should();

var utils = require('../lib/utils');

describe('Crudify: utils', function() {

  describe('setConfig', function() {});
  describe('route', function() {
    it('do get do add get to router');
    it('do post do add post to router');
    it('do put do add put to router');
    it('do delete do add delete to router');
  });
  describe('_setMethods', function() {

    it('enable true if options is not defined', function(done) {
      utils._setMethods(undefined, 'test').enable.should.be.true;
      done();
    });
    it('enable true if options[test] is not defined', function(done) {
      utils._setMethods({
        other: {}
      }, 'test').enable.should.be.true;
      done();
    });
    it('enable true if options[test].enable is not defined', function(done) {
      utils._setMethods({
        test: {}
      }, 'test').enable.should.be.true;
      done();
    });
    it('enable true if options[test].enable  is true', function(done) {
      utils._setMethods({
        test: {
          enable: true
        }
      }, 'test').enable.should.be.true;
      done();
    });
    it('enable false if options[test].enable is false', function(done) {
      utils._setMethods({
        test: {
          enable: false
        }
      }, 'test').enable.should.be.false;
      done();
    });

    it('function is default if options is not defined', function(done) {
      utils._setMethods(undefined, 'test', 'default').function.should.equal('default');
      done();
    });
    it('function is default if options[test] is is not defined', function(done) {
      utils._setMethods({
        other: {}
      }, 'test', 'default').function.should.equal('default');
      done();
    });
    it('function is default if options[test].function is not defined', function(done) {
      utils._setMethods({
        test: {}
      }, 'test', 'default').function.should.equal('default');
      done();
    });
    it('function is custom if options[test].function is custom', function(done) {
      utils._setMethods({
        test: {
          function: 'custom'
        }
      }, 'test', 'default').function.should.equal('custom');
      done();
    });

    it('middlewares is [] if options is not defined', function(done) {
      utils._setMethods(undefined, 'test', 'default')
        .middlewares.should.be.an('array').with.length(0);
      done();
    });
    it('middlewares is [] if options[test] is not defined', function(done) {
      utils._setMethods({
          other: {}
        }, 'test', 'default')
        .middlewares.should.be.an('array').with.length(0);
      done();
    });
    it('middlewares is [] if options[test].middlewares is not defined', function(done) {
      utils._setMethods({
          test: {}
        }, 'test', 'default')
        .middlewares.should.be.an('array').with.length(0);
      done();
    });
    it('function is [custom] if options[test].middlewares is [custom]', function(done) {
      utils._setMethods({
          test: {
            middlewares: ['custom']
          }
        }, 'test', 'default')
        .middlewares.should.be.an('array').with.length(1);
      done();
    });
  });
  describe('_setMiddlewares', function() {
    it('middlewares is [] if options is not defined', function(done) {
      utils._setMiddlewares(undefined)
        .should.be.an('array').with.length(0);
      done();
    });
    it('middlewares is [] if options.middlewares is not defined', function(done) {
      utils._setMiddlewares({
          other: {}
        })
        .should.be.an('array').with.length(0);
      done();
    });
    it('middlewares is [] if options.middlewares.length is not defined', function(done) {
      utils._setMiddlewares({
          middlewares: {}
        })
        .should.be.an('array').with.length(0);
      done();
    });
    it('function is [custom] if options.middlewares is [custom]', function(done) {
      utils._setMiddlewares({
          middlewares: ['custom']
        })
        .should.be.an('array').with.length(1);
      done();
    });
  });
  describe('_routeMethod', function() {
    var router = {
      get: function(path, f) {
        return [path, f]
      },
      post: function(path, f) {
        return [path, f]
      },
      put: function(path, f) {
        return [path, f]
      },
      delete: function(path, f) {
        return [path, f]
      }
    };
    var options = {
      test: {
        enable: true,
        function: 'function'
      }
    };
    it('route function {test} if option[test].enable is true an method is get', function(done) {
      var res = utils._routeMethod(router, 'get', 'path', options, 'test');
      res.should.be.an('array').with.length(2);
      res[0].should.equal('path');
      res[1].should.equal('function');
      done();
    });
    it('route function {test} if option[test].enable is true an method is post', function(done) {
      var res = utils._routeMethod(router, 'post', 'path', options, 'test');
      res.should.be.an('array').with.length(2);
      res[0].should.equal('path');
      res[1].should.equal('function');
      done();
    });
    it('route function {test} if option[test].enable is true an method is put', function(done) {
      var res = utils._routeMethod(router, 'put', 'path', options, 'test');
      res.should.be.an('array').with.length(2);
      res[0].should.equal('path');
      res[1].should.equal('function');
      done();
    });
    it('route function {test} if option[test].enable is true an method is delete', function(done) {
      var res = utils._routeMethod(router, 'delete', 'path', options, 'test');
      res.should.be.an('array').with.length(2);
      res[0].should.equal('path');
      res[1].should.equal('function');
      done();
    });
    it('do not route function {test} if option[test].enable is true and method is not in HTTP verbs', function(done) {
      var res = utils._routeMethod(router, 'invalid', 'path', options, 'test');
      should.not.exist(res);
      done();
    });
    var options2 = {
      test: {
        enable: false,
        function: 'function'
      }
    };
    it('do not route function {test} if option[test].enable is false and method is get', function(done) {
      var res = utils._routeMethod(router, 'get', 'path', options2, 'test');
      should.not.exist(res);
      done();
    });
    it('do not route function {test} if option[test].enable is false and method is post', function(done) {
      var res = utils._routeMethod(router, 'post', 'path', options2, 'test');
      should.not.exist(res);
      done();
    });
    it('do not route function {test} if option[test].enable is false and method is put', function(done) {
      var res = utils._routeMethod(router, 'put', 'path', options2, 'test');
      should.not.exist(res);
      done();
    });
    it('do not route function {test} if option[test].enable is false and method is delete', function(done) {
      var res = utils._routeMethod(router, 'delete', 'path', options2, 'test');
      should.not.exist(res);
      done();
    });
    it('do not route function {test} if option[test].enable is false and method is not in HTTP verbs', function(done) {
      var res = utils._routeMethod(router, 'invalid', 'path', options2, 'test');
      should.not.exist(res);
      done();
    });
  });
});
