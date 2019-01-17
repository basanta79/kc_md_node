'use strict';

var mongoose = require('mongoose');
var lib = require('../lib/connectMongoose');
var db = mongoose.connection;
var schema = require('../model/anuncio');
var Anuncio = mongoose.model('anuncio', schema);

var arr = [
    {
        nombre: 'Star Wars',
        edad: 27
    },
    {
        nombre: 'pepeeee',
        edad: 27
    }
];

db.once('open', function() {

    var promInsert = Anuncio.create({nombre: 'hola caracola'});

    promInsert.then((data) => {
        console.log(data);
        db.close();
    });

    /**
     * hacer consultas
     */
   /*  var prom = Anuncio.find().exec();

    prom.then((data) => {
        console.log(data);
        db.close();
    }); */

});

    /* Anuncio.insertMany(arr, function(error, docs) {
        if (error) {
            console.log(error);
        } else {
            console.log(docs);
        }
    }) */



    /* Anuncio.insertMany(arr).then((data) => {
        console.log(data);
        Anuncio.find().exec((err, document) => {
            if (err) {
                console.log(err);
            }
            console.log(document);
            db.close();
        });
    }).catch((err) => {
        console.log('Ha ocurrido un error: ', err);
        db.close();
    }); */
    
    





/* console.log(Anuncio.find()); */



/* {
            nombre: 'nombre2',
            venta: 'true',
            precio: 231.8,
            foto: 'cosa.jpg',
            tags: [
                'lifestayle',
                'home'
            ]
        },
        {
            nombre: 'nombre3',
            venta: 'true',
            precio: 233.8,
            foto: 'cosa3.jpg',
            tags: [
                'lifestayle',
                'home'
            ]
        } */