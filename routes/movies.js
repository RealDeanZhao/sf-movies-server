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
            res.send(502, result.error);
        } else {
            res.send(302, result.data);
        }
    });
});

router.get('/:id', function (req, res, next) {
    movieDAL.get(req.params.id, function(result){
        if (result.error && result.error !== '') {
            res.send(502, result.error);
        } else {
            res.send(302, result.data);
        }
    });
});

router.post('/', function (req, res, next) {
    var movie = new Movie({
        title: req.body.title,
        release_year: req.body.release_year,
        locations: req.body.locations,
        fun_facts: req.body.fun_facts,
        production_company: req.body.production_company,
        distributor: req.body.distributor,
        director: req.body.director,
        writer: req.body.writer,
        actor_1: req.body.actor_1,
        actor_2: req.body.actor_2,
        actor_3: req.body.actor_3
    });

    movie.save().then(function (result) {
        res.send(200, result)
    }).error(function (err) {
        res.send(502, err);
    });
});

router.put('/:id', function (req, res, next) {
    var movie = new Movie({
        title: req.body.title,
        release_year: req.body.release_year,
        locations: req.body.locations,
        fun_facts: req.body.fun_facts,
        production_company: req.body.production_company,
        distributor: req.body.distributor,
        director: req.body.director,
        writer: req.body.writer,
        actor_1: req.body.actor_1,
        actor_2: req.body.actor_2,
        actor_3: req.body.actor_3,
        id: req.params.id
    });

    movie.save().then(function (result) {
        res.send(200, result)
    }).error(function (err) {
        res.send(502, err);
    });
});

router.delete('/:id', function (req, res, next) {
    Movie.get(req.params.id).then(function (movie) {
        movie.delete().then(function (result) {
            res.send(200, result)
        }).error(function (err) {
            res.send(502, err)
            console.log(err)
        }).error(function (err) {
            res.send(502, err)
            console.log(err)
        });
    })
});

module.exports = router;
