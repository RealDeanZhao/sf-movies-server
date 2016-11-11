var Movie = require('../models/movie');
var thinky = require('thinky')();
var r = thinky.r;
var geocoding = require('../utility/geocoding');
var async = require('async');

exports.list = function (limit, page, callback) {
    var result = {};
    Movie.orderBy({ index: r.desc('release_year') })
        .filter({})
        .slice(limit * (page - 1), limit * (page))
        .run().then(function (data) {
            result.data = data;
            // It is better to retrived the coordinate from the client side.
            // async.every(result.data, function (movie, innerCallback) {
            //     geocoding.getCoordinate(movie.locations, function (coordinate) {
            //         movie.lat = coordinate.lat;
            //         movie.lng = coordinate.lng;
            //         innerCallback();
            //     });
            // }, function (err, innerResult) {
            //    
            // });
            callback(result);
        }).error(function (err) {
            result.data = [];
            result.error = err;
            callback(result);
        });
}

exports.get = function (id, callback) {
    var result = {};
    Movie.filter({ id: req.params.id })
        .run()
        .then(function (data) {
            result.data = data;
            callback(result);
        }).error(function (err) {
            result.data = [];
            result.error = err;
            callback(result);
        });
}

exports.create = function (id, callback) {
    var result = {};
    Movie.filter({ id: req.params.id })
        .run()
        .then(function (data) {
            result.data = data;
            callback(result);
        }).error(function (err) {
            result.data = [];
            result.error = err;
            callback(result);
        });
}

exports.update = function (id, callback) {
    var result = {};
    Movie.filter({ id: req.params.id })
        .run()
        .then(function (data) {
            result.data = data;
            callback(result);
        }).error(function (err) {
            result.data = [];
            result.error = err;
            callback(result);
        });
}

exports.delete = function (id, callback) {
    var result = {};
    Movie.filter({ id: req.params.id })
        .run()
        .then(function (data) {
            result.data = data;
            callback(result);
        }).error(function (err) {
            result.data = [];
            result.error = err;
            callback(result);
        });
}