var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var thinky = require('thinky')();
var r = thinky.r;
var movieDAL = require('../DAL/movie');

router.get('/', function (req, res, next) {
    var limit = req.query.limit ? req.query.limit : 50;
    var page = req.query.page ? req.query.page : 1;

    movieDAL.list(limit, page, function (result) {
        if (result.error && result.error !== '') {
            res.status(502).send(result);
        } else {
            res.status(302).send(result);
        }
    });
});

router.get('/:id', function (req, res, next) {
    movieDAL.get(req.params.id, function (result) {
        if (result.error && result.error !== '') {
            res.status(502).send(result);
        } else {
            res.status(302).send(result);
        }
    });
});

router.post('/', function (req, res, next) {
    movieDAL.create(req.body, function (result) {
        if (result.error && result.error !== '') {
            res.status(502).send(result);
        } else {
            res.status(200).send(result);
        }
    });
});

router.put('/:id', function (req, res, next) {
    console.log(req.body);
    movieDAL.update(req.params.id, req.body, function (result) {
        if (result.error && result.error !== '') {
            res.status(502).send(result);
        } else {
            res.status(200).send(result);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    movieDAL.delete(req.params.id, function (result) {
        if (result.error && result.error !== '') {
            res.status(502).send(result.error);
        } else {
            res.status(200).send(result.data);
        }
    });
});

module.exports = router;
