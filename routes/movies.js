var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var thinky = require('thinky')();
var r = thinky.r;
var movieDAL = require('../DAL/movie');

function routeWrapper(route, statusForNonError) {
    return function (req, res, next) {
        route(req, function (result) {
            if (result.error)
                next(result.error);
            res.status(statusForNonError).send(result);
        });
    }
}

function getList(req, handleResult) {
    var limit = req.query.limit ? req.query.limit : 50;
    var page = req.query.page ? req.query.page : 1;
    var title = req.query.title ? req.query.title : '';
    var query = {
        limit: limit,
        page: page,
        title: title
    }

    movieDAL.list(query, handleResult);
}
router.get('/', routeWrapper(getList, 200));

router.get('/:id', function (req, res, next) {
    movieDAL.get(req.params.id, function (result) {
        if (result.error)
            next(result.error);
        res.status(302).send(result);
    });
});

router.post('/', function (req, res, next) {
    movieDAL.create(req.body, function (result) {
        if (result.error)
            next(result.error);
        res.status(200).send(result);
    });
});

router.put('/:id', function (req, res, next) {
    movieDAL.update(req.params.id, req.body, function (result) {
        if (result.error)
            next(result.error);
        res.status(200).send(result);
    });
});

router.delete('/:id', function (req, res, next) {
    movieDAL.delete(req.params.id, function (result) {
        if (result.error)
            next(result.error);
        res.status(200).send(result.data);
    });
});

module.exports = router;
