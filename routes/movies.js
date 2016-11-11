var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var thinky = require('thinky')();
var r = thinky.r;

router.get('/', function (req, res, next) {
    var limit = req.query.limit ? req.query.limit : 100;
    var page = req.query.page ? req.query.page : 1;


    Movie.orderBy({ index: r.desc('release_year') })
        .filter({})
        .slice(limit * (page - 1), limit * (page))
        .run().then(function(result){
            res.send(result);
        }).error(function(err){
            console.log(err)
            res.send([]);
        });
});

router.get('/:id', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.put('/:id', function (req, res, next) {
    res.send('respond with a resource');
});

router.delete('/:id', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
