var thinky = require('thinky')();
var type = thinky.type;

var Movie = thinky.createModel('Movie', {
    id: type.string(),
    title: type.string(),
    release_year: type.string(),
    locations: type.string(),
    fun_facts: type.string(),
    production_company: type.string(),
    distributor: type.string(),
    director: type.string(),
    writer: type.string(),
    actors: [type.string()],
    model_version: type.number()
});

Movie.ensureIndex('release_year');

function hydrateMovie(movie) {
    if (movie.model_schema) {
        if (movie.model_schema === 1) {
            //
        }
    } else {
        movie.actors = new Array(movie.actor_1, movie.actor_2, movie.actor_3);
        movie.model_schema = 2; // latest version for this model, should be configurable.
    }
}
Movie.pre('save', function (next) {
    var self = this;
    hydrateMovie(self);
    next();
});

Movie.post('retrieve', function (next) {
    var self = this;
    hydrateMovie(self);
    next();
});

module.exports = Movie;