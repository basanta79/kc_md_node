'use strict';

var express = require('express');
var router = express.Router();
const Anuncio = require('../model/anuncio');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'nodepop' });
});

router.get('/anuncios', async (req, res, next) => {
    try{
        // Get param values
        const venta = req.query.venta;
        const nombre = req.query.nombre;
        const queryString = createPriceQuery(req.query.precio);
        const querytags = createTagQuery(req.query.tags);
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const sort = req.query.sort;
        console.log(`skip = ${skip}`);
        console.log(`limit = ${limit}`);

        const anuncios = await Anuncio.listar(skip, limit, venta, nombre, queryString, querytags, sort);
        res.locals.anuncios = anuncios;
        //console.log(anuncios);
    } catch (err){
        res.locals.err = err;
        //console.log('hubo un error ', err);
    }

    res.render('index');
});

/**
 * Returns a Query string for mongoDB to search one or more tag inside a list of them. 
 * Returns undefined if parameter is not present.
 * @param {String Array} list 
 */
function createTagQuery(list){
    var arrValues=[];
    var queryString = {};

    if (list !== undefined) {
        const tags = list.split(' ');
        tags.forEach(element => {
            arrValues.push({ 'tags': element });
        })
        queryString = { $or: arrValues };
        return queryString;
    } else {
        return list;
    }
}

/**
 * Converts the input parameter into a queryString to send to Mongo. 
 * Whether the parameter is not present, returns undefined
 * param must be a number, two numbers separated by "-" or a number with a "-"before or aftes.
 * e.g.: 
 * 100  : Must match 100
 * 100- : Must be higher or equal than 100
 * -100 : Must be lower or equal than 100
 * 50-100 : Must be between 50 and 100, included both.
 *
 * @param {string} param 
 */
function createPriceQuery(param){
    var queryString
    
    if(param !== undefined){
        const precio = param.split("-");
        if (precio[1]==undefined){
            queryString=precio[0];
        } else if (precio[1]==0){
            queryString = { '$gte': precio[0]};
        } else if (precio[0]==0){
            queryString = { '$lte': precio[1]};
        } else {
            queryString = { '$gte': precio[0] , '$lte': precio[1]};
        }
        return queryString;
    }else{
        return param;
    }
}

module.exports = router;
