var thinky = require('thinky')();
var type = thinky.type;

var Movie = thinky.createModel('Movie', {
    id: String,
    title: String,
    release_year: String,
    locations: String,
    fun_facts: String,
    production_company: String,
    distributor: String,
    director: String,
    writer: String,
    actor_1: String,
    actor_2: String,
    actor_3: String
});

Movie.ensureIndex('release_year');

module.exports = Movie;