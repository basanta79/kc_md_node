'use strict';

var express = require('express');
var router = express.Router();
const Anuncio = require('../../model/anuncio');


router.get('/', async(req, res, next) => {
    let result = {};
    try{
        //const anuncios = await Anuncio.find();
        const venta = req.query.venta;
        const nombre = req.query.nombre;
        const price = req.query.precio;
        const tags = req.query.tags;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const sort = req.query.sort;
        const anuncios = await Anuncio.listar(skip, limit, venta, nombre, price, tags, sort);
        result.success = 'true';
        result.qtyAnuncios = anuncios.length;
        result.anuncios = anuncios;

    } catch (err) {
        result.success='false';
        result.description = err;
    }

    res.json(result);
});

module.exports = router;
