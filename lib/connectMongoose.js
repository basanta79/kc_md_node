'use strict';

var mongoose = require('mongoose');

var db = mongoose.connection;

mongoose.connection.on('error', function(err){
    console.log(err);
    process.exit(1);
})

mongoose.connection.once('open', function(){
    console.info(`connectado a MongoDB`);
});

mongoose.connect('mongodb://localhost/cursonode', {useNewUrlParser: true});

module.exports = mongoose.connection;

