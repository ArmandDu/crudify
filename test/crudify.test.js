'use strict';

var should = require('chai').Should();
var mongoose = require('mongoose');
var request = require('supertest');
var dbURI = 'mongodb://localhost/crudify-testdb';
var clearDB = require('mocha-mongoose')(dbURI);

var User = mongoose.model('User', new mongoose.Schema({
  name: String,
  age: Number
}));

var express = require('express');
var Crudify = require('../index');

describe('Crudify', function() {

  describe('Setup', function() {

    it('can create router', function(done) {
      var router = new Crudify(express, User).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.should.have.length(5);
      done();
    });
    it('router contain 2 GET methods', function(done) {
      var router = new Crudify(express, User).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.get;
      }).should.have.length(2);
      done();
    });
    it('router contain POST method', function(done) {
      var router = new Crudify(express, User).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.post;
      }).should.have.length(1);
      done();
    });
    it('router contain PUT method', function(done) {
      var router = new Crudify(express, User).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.put;
      }).should.have.length(1);
      done();
    });
    it('router contain DELETE method', function(done) {
      var router = new Crudify(express, User).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.delete;
      }).should.have.length(1);
      done();
    });
    it('can have middleware');
    it('can disable find', function(done) {
      var router = new Crudify(express, User, {
        find: {
          enable: false
        }
      }).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.get;
      });
      routes.should.have.length(1);
      should.exist(routes[0], 'route [0] should exist');
      should.exist(routes[0].stack, 'route [0] stack should exist');
      routes[0].stack[0].name.should.equal('findOne');
      done();
    });
    it('can disable findOne', function(done) {
      var router = new Crudify(express, User, {
        findOne: {
          enable: false
        }
      }).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.get;
      });
      routes.should.have.length(1);
      should.exist(routes[0], 'route [0] should exist');
      should.exist(routes[0].stack, 'route [0] stack should exist');
      routes[0].stack[0].name.should.equal('find');
      done();
    });
    it('can disable store', function(done) {
      var router = new Crudify(express, User, {
        store: {
          enable: false
        }
      }).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.post;
      });
      routes.should.have.length(0);
      done();
    });
    it('can disable update', function(done) {
      var router = new Crudify(express, User, {
        update: {
          enable: false
        }
      }).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.put;
      });
      routes.should.have.length(0);
      done();
    });
    it('can disable destroy', function(done) {
      var router = new Crudify(express, User, {
        destroy: {
          enable: false
        }
      }).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.delete;
      });
      routes.should.have.length(0);
      done();
    });
    it('can overwrite find', function(done) {
      var router = new Crudify(express, User, {
        find: {
          function: function overwritten(req, res) {}
        },
        findOne: {
          enable: false
        }
      }).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.get;
      });
      routes.should.have.length(1);
      should.exist(routes[0], 'route [0] should exist');
      should.exist(routes[0].stack, 'route [0] stack should exist');
      routes[0].stack[0].name.should.equal('overwritten');
      done();
    });
    it('can overwrite findOne', function(done) {
      var router = new Crudify(express, User, {
        findOne: {
          function: function overwritten(req, res) {}
        },
        find: {
          enable: false
        }
      }).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.get;
      });
      routes.should.have.length(1);
      should.exist(routes[0], 'route [0] should exist');
      should.exist(routes[0].stack, 'route [0] stack should exist');
      routes[0].stack[0].name.should.equal('overwritten');
      done();
    });
    it('can overwrite store', function(done) {
      var router = new Crudify(express, User, {
        store: {
          function: function overwritten(req, res) {}
        }
      }).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.post;
      });
      routes.should.have.length(1);
      should.exist(routes[0], 'route [0] should exist');
      should.exist(routes[0].stack, 'route [0] stack should exist');
      routes[0].stack[0].name.should.equal('overwritten');
      done();
    });
    it('can overwrite update', function(done) {
      var router = new Crudify(express, User, {
        update: {
          function: function overwritten(req, res) {}
        }
      }).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.put;
      });
      routes.should.have.length(1);
      should.exist(routes[0], 'route [0] should exist');
      should.exist(routes[0].stack, 'route [0] stack should exist');
      routes[0].stack[0].name.should.equal('overwritten');
      done();
    });
    it('can overwrite delete', function(done) {
      var router = new Crudify(express, User, {
        destroy: {
          function: function overwritten(req, res) {}
        }
      }).Router();
      should.exist(router, 'router should exist');
      var routes = router.stack.map(function(layer) {
        return layer.route;
      }).filter(function(route) {
        return route.methods.delete;
      });
      routes.should.have.length(1);
      should.exist(routes[0], 'route [0] should exist');
      should.exist(routes[0].stack, 'route [0] stack should exist');
      routes[0].stack[0].name.should.equal('overwritten');
      done();
    });
  });

  describe('Basics', function() {
    function mockServer() {
      var app = express();
      var bodyParser = require('body-parser');
      var methodOverride = require('method-override');

      if (!mongoose.connection.db) {
        mongoose.connect(dbURI);
      }
      var Crudify = require('../index');

      app.use(bodyParser.json());
      app.use(bodyParser.json({
        type: 'application/vnd.api+json'
      }));
      app.use(bodyParser.urlencoded({
        extended: true
      }));
      app.use(methodOverride('X-HTTP-Method-Override'));
      app.use('/users', new Crudify(express, User).Router());

      return app.listen();
    }

    var server;
    before(function(done) {
      server = mockServer();
      done();
    });
    after(function(done) {
      server.close();
      done();
    });

    describe('store', function() {
      it('can store', function(done) {
        request(server)
          .post('/users')
          .send({
            name: 'Name',
            age: 42
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end(done);
      });
    });
    describe('find', function() {

      var id;
      beforeEach(function(done) {
        User.create([{
          name: 'Name',
          age: 42
        }, {
          name: 'Name2',
          age: 15
        }], function(err, users) {
          if (err) return done(err);
          id = users[0]._id;
          done();
        });
      });

      it('can find all users', function(done) {
        request(server)
          .get('/users')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
            if (err) done(err);
            should.exist(res, 'res should exist');
            should.exist(res.body, 'body should exist');
            should.exist(res.body.result, 'result should exist');
            res.body.result.should.be.an('array').with.length(2);
            done();
          });
      });
      it('can find user by id', function(done) {
        request(server)
          .get('/users/' + id)
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
            if (err) done(err);
            should.exist(res, 'res should exist');
            should.exist(res.body, 'body should exist');
            should.exist(res.body.result, 'result should exist');
            res.body.result.should.be.an('object')
            res.body.result.name.should.equal('Name');
            res.body.result.age.should.equal(42);
            done();
          });
      });
      it('can not find one user if id is invalid', function(done) {
        request(server)
          .get('/users/' + "0")
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
            if (err) done(err);
            should.exist(res, 'res should exist');
            should.exist(res.body, 'body should exist');
            should.exist(res.body.error);
            should.not.exist(res.body.result);

            done();
          });
      });
    });
    describe('update', function() {});
    describe('delete', function() {});

  });
});
