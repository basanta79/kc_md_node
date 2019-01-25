'use strict';

var express = require('express');
var router = express.Router();
const Anuncio = require('../model/anuncio');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/anuncios');
    //res.render('index', { title: 'nodepop' });
});

router.get('/anuncios', async (req, res, next) => {
    try{
        // Get param values
        const venta = req.query.venta;
        const nombre = req.query.nombre;
        const price = req.query.precio;
        const tags = req.query.tags;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const sort = req.query.sort;
        console.log(`skip = ${skip}`);
        console.log(`limit = ${limit}`);

        const anuncios = await Anuncio.listar(skip, limit, venta, nombre, price, tags, sort);
        res.locals.anuncios = anuncios;
        //console.log(anuncios);
    } catch (err){
        res.locals.err = err;
        //console.log('hubo un error ', err);
    }

    res.render('index');
});


module.exports = router;
