'use strict';

var mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String],
});

anuncioSchema.statics.listar = (skip, limit, venta, startsWith, priceQuery, tagsQuery, sort) => {
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

    query.where(createTagQuery(tagsQuery));
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);

    //console.log(limiteInferior + " " + limiteSuperior);

    return query.exec();
};

/**
 * Returns a Query string for mongoDB to search one or more tag
 * inside a list of them.
 * Returns undefined if parameter is not present.
 * @param {String} list
 * @return {object} valid query for mongoose, or empty if param was not present
 */
function createTagQuery(list) {
    var arrValues = [];
    var queryString = {};

    if (list !== undefined) {
        const tags = list.split(' ');
        tags.forEach((element) => {
            arrValues.push({ 'tags': element });
        })
        queryString = { $or: arrValues };
    }

    return queryString;
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
