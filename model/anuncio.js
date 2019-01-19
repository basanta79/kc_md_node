'use strict';

var mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String],
});

anuncioSchema.statics.listar = () => {
    const query = Anuncio.find();

    return query.exec();
};

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
