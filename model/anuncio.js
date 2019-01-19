'use strict';

var mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String],
});

anuncioSchema.statics.listar = (venta, startsWith) => {
    const query = Anuncio.find();

    if (venta !== undefined) { 
        query.where('venta', venta);
    };

    console.log(startsWith);
    if (startsWith !== undefined) { 
        query.where({nombre: { $regex: "^" + startsWith }});
    }

    
    return query.exec();
};

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
