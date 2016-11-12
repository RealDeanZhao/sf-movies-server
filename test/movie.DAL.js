var chai = require('chai')
  , should = chai.should();

var movieDAL = require('../DAL/movie');

describe('DAL/movie.js', function () {
  describe('#list()', function () {
    it('should get the first 50 records', function (done) {
      var query = {
        limit: 50,
        page: 1,
        title: ''
      }
      movieDAL.list(query, function (result) {
        result.should.be.a('object');
        result.should.have.property('data');
        result.data.should.have.length(50);
        done();
      });
    });
    it('should get 50 records from the 3rd page', function (done) {
      var query = {
        limit: 20,
        page: 3,
        title: ''
      }
      movieDAL.list(query, function (result) {
        result.should.be.a('object');
        result.should.have.property('data');
        result.data.should.have.length(20);
        done();
      });
    });
    it('should get the records which the title start with Need', function (done) {
      var query = {
        limit: 50,
        page: 1,
        title: 'Need'
      }
      movieDAL.list(query, function (result) {
        result.should.be.a('object');
        result.should.have.property('data');
        for (var movie of result.data) {
          movie.title.should.contain('Need');
        }
        done();
      });
    });
  });

  describe('#get()', function () {
    it('should get one record that id is 04bce074-eba3-4ef1-ab9a-c13871a87e0f', function (done) {
      var id = '04bce074-eba3-4ef1-ab9a-c13871a87e0f';
      movieDAL.get(id, function (result) {
        result.should.be.a('object');
        result.should.have.property('data');
        result.data.should.have.property('id');
        result.data.id.should.equal(id);
        done();
      });
    });
  });

  describe('#create()', function () {
    it('should create one record with the specific title', function (done) {
      var title = 'title-test-' + Date.now();
      var movie = {
        title: title,
        release_year: '2017',
        locations: 'Chongqing, China',
        fun_facts: 'what is it',
        production_company: 'HPE',
        distributor: 'Dean Zhao',
        director: 'Dean Zhao',
        writer: 'Dean ZHao',
        actor_1: 'Dean Zhao',
        actor_2: 'Dean Zhao',
        actor_3: 'Dean ZHao'
      }
      movieDAL.create(movie, function (result) {
        result.should.be.a('object');
        result.should.have.property('data');
        result.data.should.have.property('id');
        result.data.title.should.equal(movie.title);
        result.data.release_year.should.equal(movie.release_year);
        result.data.locations.should.equal(movie.locations);
        result.data.fun_facts.should.equal(movie.fun_facts);
        result.data.production_company.should.equal(movie.production_company);
        result.data.distributor.should.equal(movie.distributor);
        result.data.director.should.equal(movie.director);
        result.data.writer.should.equal(movie.writer);
        result.data.actor_1.should.equal(movie.actor_1);
        result.data.actor_2.should.equal(movie.actor_2);
        result.data.actor_3.should.equal(movie.actor_3);
        done();
      });
    });
  });

  describe('#update()', function () {
    it('should update one record with the specific value', function (done) {
      var title = 'title-test-' + Date.now();
      var movie = {
        title: title,
        release_year: '2017',
        locations: 'Chongqing, China',
        fun_facts: 'what is it',
        production_company: 'HPE',
        distributor: 'Dean Zhao',
        director: 'Dean Zhao',
        writer: 'Dean ZHao',
        actor_1: 'Dean Zhao',
        actor_2: 'Dean Zhao',
        actor_3: 'Dean ZHao'
      }
      var newTitle = title + '-new';
      var newMovie = {
        title: newTitle,
        release_year: '2018',
        locations: 'Chongqing, China, New',
        fun_facts: 'what is it new',
        production_company: 'HPE new',
        distributor: 'Dean Zhao new',
        director: 'Dean Zhao new',
        writer: 'Dean ZHao new',
        actor_1: 'Dean Zhao new',
        actor_2: 'Dean Zhao new',
        actor_3: 'Dean ZHao new'
      }
      movieDAL.create(movie, function (result) {
        movieDAL.update(result.data.id, newMovie, function (innerResult) {
          innerResult.should.be.a('object');
          innerResult.should.have.property('data');
          innerResult.data.should.have.property('id');
          innerResult.data.title.should.equal(newMovie.title);
          innerResult.data.release_year.should.equal(newMovie.release_year);
          innerResult.data.locations.should.equal(newMovie.locations);
          innerResult.data.fun_facts.should.equal(newMovie.fun_facts);
          innerResult.data.production_company.should.equal(newMovie.production_company);
          innerResult.data.distributor.should.equal(newMovie.distributor);
          innerResult.data.director.should.equal(newMovie.director);
          innerResult.data.writer.should.equal(newMovie.writer);
          innerResult.data.actor_1.should.equal(newMovie.actor_1);
          innerResult.data.actor_2.should.equal(newMovie.actor_2);
          innerResult.data.actor_3.should.equal(newMovie.actor_3);
          done();
        });
      });
    });
  });

  describe('#delete()', function () {
    it('should delete one record with the specific id', function (done) {
      var title = 'title-test-' + Date.now();
      var movie = {
        title: title,
        release_year: '2017',
        locations: 'Chongqing, China',
        fun_facts: 'what is it',
        production_company: 'HPE',
        distributor: 'Dean Zhao',
        director: 'Dean Zhao',
        writer: 'Dean ZHao',
        actor_1: 'Dean Zhao',
        actor_2: 'Dean Zhao',
        actor_3: 'Dean ZHao'
      }

      movieDAL.create(movie, function (result) {
        movieDAL.delete(result.data.id, function (innerResult) {
          innerResult.should.be.a('object');
          innerResult.should.have.property('data');
          innerResult.data.should.have.property('id');
          innerResult.data.id.should.equal(result.data.id);
          innerResult.data.title.should.equal(movie.title);
          innerResult.data.release_year.should.equal(movie.release_year);
          innerResult.data.locations.should.equal(movie.locations);
          innerResult.data.fun_facts.should.equal(movie.fun_facts);
          innerResult.data.production_company.should.equal(movie.production_company);
          innerResult.data.distributor.should.equal(movie.distributor);
          innerResult.data.director.should.equal(movie.director);
          innerResult.data.writer.should.equal(movie.writer);
          innerResult.data.actor_1.should.equal(movie.actor_1);
          innerResult.data.actor_2.should.equal(movie.actor_2);
          innerResult.data.actor_3.should.equal(movie.actor_3);
          done();
        });
      });
    });
  });
});