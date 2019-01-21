'use strict';

var express = require('express');
var router = express.Router();


router.get('/', async(req, res, next) => {
    let result = {};
    try{

        result.success = 'true';
        
    } catch (err) {
        result.success='false';
        result.description = err;
    }

    res.json(result);
});

module.exports = router;
