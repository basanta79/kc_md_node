'use strict';

var express = require('express');
var router = express.Router();
const Anuncio = require('../model/anuncio');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'nodepop' });
});

router.get('/anuncios', async(req, res, next) => {
    try{
        const anuncios = await Anuncio.listar();
        res.locals.anuncios = anuncios;
        //console.log(anuncios);
    } catch (err){
        res.locals.err = err;
        //console.log('hubo un error ', err);
    }

    res.render('index');
});

module.exports = router;
