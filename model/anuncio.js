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
    query.where(createPriceQuery(priceQuery));
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
 * @param {String} list query from request object
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

/**
 * Converts the input parameter into a queryString to send to Mongo.
 * Whether the parameter is not present, returns undefined
 * param must be a number, two numbers separated by "-"
 * or a number with a "-"before or aftes.
 * e.g.:
 * 100  : Must match 100
 * 100- : Must be higher or equal than 100
 * -100 : Must be lower or equal than 100
 * 50-100 : Must be between 50 and 100, included both.
 *
 * @param {string} param query from request object
 * @return {object} valid query for mongoose, or empty if param was not present
 */
function createPriceQuery(param) {
    var queryString = {};

    if (param !== undefined) {
        const precio = param.split('-');
        if (precio[1] == undefined) {
            queryString = { precio: precio[0] };
        } else if (precio[1] == 0) {
            queryString = { precio: { '$gte': precio[0] } };
        } else if (precio[0] == 0) {
            queryString = { precio: { '$lte': precio[1] } };
        } else {
            queryString = { precio: { '$gte': precio[0], '$lte': precio[1] } };
        }
    }

    return queryString;
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
