var chai = require('chai');
var expect = chai.expect;
var nock = require('nock');
var rp = require('request-promise');
var complaint = require('./mock/complaint.json');
var created = require('./mock/created');
var list = require('./mock/list.json');
var update = require('./mock/update.json');
var updated = require('./mock/updated.json');
var deleted = require('./mock/deleted.json');
var companies = require('./mock/companies.json');
var distance = require('./mock/distance.json');

describe('api', function() {
 

  describe('POST /complaints', function() {

    var options;

    before(() => {
      nock('http://localhost:3000')
        .post('/complaints')
        .reply(200, created);
      options = {
        method: 'POST',
        uri: 'http://localhost:3000/complaints',
        body: {
            complaint
        },
        json: true // Automatically stringifies the body to JSON
      };        
    });

    it("deveria retornar o objeto created", (done) => {
      rp(options).then(response => {
        expect(response._id).to.be.equals(created._id);
        done();
      })
    });
  })

  describe('GET /complaints', function() {

    before(() => {
      nock('http://localhost:3000')
        .get('/complaints')
        .reply(200, list);
    });

    it("deveria retornar os complaints", (done) => {
      rp('http://localhost:3000/complaints').then(response => {
        var responseParsed = JSON.parse(response);
        expect(responseParsed.length).to.be.equals(list.length);
        done();
      })
    });
  })

  describe('GET /complaints/:id', function() {

    before(() => {
      nock('http://localhost:3000')
        .get('/complaints/5c9ec7abcc445f10641ff8db')
        .reply(200, created);
    });

    it("deveria retornar o complaint", (done) => {
      rp('http://localhost:3000/complaints/5c9ec7abcc445f10641ff8db').then(response => {
        var responseParsed = JSON.parse(response);
        expect(responseParsed._id).to.be.equals(created._id);
        done();
      })
    });
  })

  describe('PUT /complaints/:id', function() {

    var options;

    before(() => {
      nock('http://localhost:3000')
        .put('/complaints/5c9ec7abcc445f10641ff8db')
        .reply(200, updated);
      options = {
        method: 'PUT',
        uri: 'http://localhost:3000/complaints/5c9ec7abcc445f10641ff8db',
        body: {
            update
        },
        json: true // Automatically stringifies the body to JSON
      };        
    });

    it("deveria retornar o objeto created", (done) => {
      rp(options).then(response => {
        expect(response.description).to.be.equals(update.description);
        done();
      })
    });
  })

  describe('DELETE /complaints/:id', function() {

    var options;

    before(() => {
      nock('http://localhost:3000')
        .delete('/complaints/5c9ec7abcc445f10641ff8db')
        .reply(200, deleted);
        options = {
          method: 'DELETE',
          uri: 'http://localhost:3000/complaints/5c9ec7abcc445f10641ff8db'
        };        
      });

    it("deveria remover o complaint", (done) => {
      rp(options).then(response => {
        var responseParsed = JSON.parse(response);
        expect(responseParsed.message).to.be.equals(deleted.message);
        done();
      })
    });
  })

  describe('GET /complaints/locale/:name', function() {

    before(() => {
      nock('http://localhost:3000')
        .get('/complaints/locale/Campinas')
        .reply(200, companies);
    });

    it("deveria retornar os registros agrupados por companies", (done) => {
      rp('http://localhost:3000/complaints/locale/Campinas').then(response => {
        var responseParsed = JSON.parse(response);
        expect(responseParsed.length).to.be.equals(companies.length);
        done();
      })
    });
  })

  describe('GET /complaints/locale/:name', function() {

    before(() => {
      nock('http://localhost:3000')
        .get('/complaints/distance/5c9eaf2eb26afc270cd9e638/5c9eaf3ab26afc270cd9e639')
        .reply(200, distance);
    });

    it("deveria retornar a distancia entre os dois ids", (done) => {
      rp('http://localhost:3000/complaints/distance/5c9eaf2eb26afc270cd9e638/5c9eaf3ab26afc270cd9e639').then(response => {
        var responseParsed = JSON.parse(response);
        expect(responseParsed.distance).to.be.equals(distance.distance);
        done();
      })
    });
  })
  
})