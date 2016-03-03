Crudify
=========

A Minimalist CRUD Router for MEAN Stack.

I made this package because I was usually duplicating it to most of the models I have.
I also wanted to make a simple package to learn how to.

This package won't probably be deployed to NPM since I don't think it will be mature enough for production use.

*If anyone wants to create an issue or give me tips/ideas to improve this code, please do, I would love to learn.*

## Installation

  npm install https://github.com/ArmandDu/crudify.git --save

## Usage

```
    var Crudify = require('crudify');
    var express = require('express');
    var mongoose = require('mongoose');

    var app = express();
    var Foo = mongoose.model('Foo');

    mongoose.connect('mongodb://localhost/crudify-testdb');

    /*
    ** will generate
    **
    ** GET    /foos/      find all Foos
    ** GET    /foos/:id   find Foo by Id
    ** POST   /foos/       create a Foo
    ** PUT    /foos/:id   update a Foo
    ** DELETE /foos/:id   delete a Foo
    **
    */
    app.use('/foos', new Crudify(express, Foo).Router());

    app.listen();
```

Crudify().Router() returns an express Router object, you can add your own routes on top of it.

To be dependance free, I pass express as a parameter for my constructor.

I use middlewares and mongoose plugins to deal with validation and data formatting.

## Tests

  `npm test`

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release
