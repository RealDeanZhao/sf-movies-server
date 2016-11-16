var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var thinky = require('thinky')();
var r = thinky.r;
var movieDAL = require('../DAL/movie');

router.get('/', function (req, res, next) {
    movieDAL.suggestions(function (result) {
        if (result.error && result.error !== '') {
            res.status(502).send(result);
        } else {
            res.status(302).send(result);
        }
    });
});

module.exports = router;
