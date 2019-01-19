'use strict';

var mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String],
});

anuncioSchema.statics.listar = (venta, startsWith, priceQuery) => {
    const query = Anuncio.find();

    if (venta !== undefined) { 
        query.where('venta', venta);
    }

    if (startsWith !== undefined) {
        query.where({ nombre: { $regex: "^" + startsWith } });
    }

    if (priceQuery !== undefined) {
            query.where({ precio: priceQuery });
    }

    //console.log(limiteInferior + " " + limiteSuperior);

    return query.exec();
};

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
