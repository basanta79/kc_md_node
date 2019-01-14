'use strict';

var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', function(err){
    console.log(err);
})

db.once('open', function(){
    console.info(`connectado a MongoDB`);
});

mongoose.connect('mongodb://localhost/cursonode');

