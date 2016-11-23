var Movie = require('../models/movie');
var thinky = require('thinky')();
var r = thinky.r;
var geocoding = require('../utility/geocoding');
var async = require('async');

exports.list = function (query, callback) {
    var limit = query.limit;
    var page = query.page;
    var title = query.title.trim();
    var result = {};
    var regex = `(?i)${title}`;
    Movie.orderBy({ index: r.desc('release_year') })
        .filter(r.row("title").match(regex))
        .slice(limit * (page - 1), limit * (page))
        .run().then(function (data) {
            async.map(data, function (movie, innerCallback) {
                geocoding.getCoordinate(movie.locations, function (coordinate) {
                    movie.lat = coordinate.lat;
                    movie.lng = coordinate.lng;
                    innerCallback(null, movie);
                });
            }, function (err, innerResult) {
                result.data = innerResult;
                exports.count(title, function (count) {
                    result.count = count;
                    result.totalPage = Math.ceil(count / limit);
                    callback(result);
                });
            });
        }).error(function (err) {
            result.data = [];
            result.error = err;
            callback(result);
        });
}

exports.get = function (id, callback) {
    var result = {};
    Movie.get(id).then(function (data) {
        result.data = data;
        callback(result);
    }).error(function (err) {
        result.data = {};
        result.error = err;
        callback(result);
    });
}

exports.create = function (movie, callback) {
    var result = {};
    var movieToCreate = new Movie({
        title: movie.title,
        release_year: movie.release_year,
        locations: movie.locations,
        fun_facts: movie.fun_facts,
        production_company: movie.production_company,
        distributor: movie.distributor,
        director: movie.director,
        writer: movie.writer,
        actor_1: movie.actor_1,
        actor_2: movie.actor_2,
        actor_3: movie.actor_3
    });

    movieToCreate.save().then(function (data) {
        result.data = data;
        callback(result);
    }).error(function (err) {
        result.data = {};
        result.error = err;
        callback(result);
    });
}

exports.update = function (id, newMovie, callback) {
    var result = {};

    Movie.get(id).then(function (movie) {
        movie.title = newMovie.title;
        movie.release_year = newMovie.release_year;
        movie.locations = newMovie.locations;
        movie.fun_facts = newMovie.fun_facts;
        movie.production_company = newMovie.production_company;
        movie.distributor = newMovie.distributor;
        movie.director = newMovie.director;
        movie.writer = newMovie.writer;
        movie.actor_1 = newMovie.actor_1;
        movie.actor_2 = newMovie.actor_2;
        movie.actor_3 = newMovie.actor_3;
        movie.save().then(function (data) {
            result.data = data;
            callback(result);
        }).error(function (err) {
            result.data = {};
            result.error = err;
            callback(result);
        });
    }).error(function (err) {
        result.data = {};
        result.error = err;
        callback(result);
    });
}

exports.delete = function (id, callback) {
    var result = {};
    Movie.get(id).then(function (movie) {
        movie.delete().then(function (data) {
            result.data = data;
            callback(result);
        }).error(function (err) {
            result.error = err;
            result.data = {};
            callback(result);
        })
    }).error(function (err) {
        result.data = {};
        result.error = err;
        callback(result);
    });
}

exports.count = function (title, callback) {
    var regex = `(?i)${title}`;
    Movie.filter(r.row("title")
        .match(regex))
        .count()
        .execute()
        .then(function (count) {
            callback(count);
        });
}

exports.suggestions = function (callback) {
    Movie.filter({}).withFields(['title'])
        .distinct()
        .execute()
        .then(function (suggestions) {
            callback(suggestions);
        });
}