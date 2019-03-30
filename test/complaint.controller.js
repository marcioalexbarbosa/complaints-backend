var expect = require('chai').expect;
var complaints_controller = require('../app/controllers/complaint.controller');
const Complaint = require('../app/models/complaint.model.js');
const sinon = require('sinon');

describe('complaints.controller', function() {

  context('create', function() {
    
    var req, res;
    before(function() {
        req = {body: {description: 'test'}};
        res = {status: 200, send: () => {}};
        sinon.stub(Complaint.save);
        complaints_controller.create(req, res);
    })

    it('deveria retornar status 200', function() {
      expect(res.status).to.be.equals(200);
    })
  })

  context('findAll', function() {
    
    var req, res;
    before(function() {
        req = {};
        res = {status: 200, send: () => {}};
        sinon.stub(Complaint.find);
        complaints_controller.findAll(req, res);
    })

    it('deveria retornar status 200', function() {
      expect(res.status).to.be.equals(200);
    })
  })

  context('findOne', function() {
    
    var req, res;
    before(function() {
        req = {params: {id: 'test'}};
        res = {status: 200, send: () => {}};
        var findOneStub = sinon.stub(Complaint, 'findById')
        findOneStub.resolves({locale: "Piracicaba"});
        complaints_controller.findOne(req, res);
    })

    it('deveria retornar status 200', function() {
      expect(res.status).to.be.equals(200);
    })
  })

  context('update', function() {
    
    var req, res;
    before(function() {
        req = {body: {description: 'test'}, params: {id: 'id'}};
        res = {status: 200, send: () => {}};
        var stub = sinon.stub(Complaint, 'findByIdAndUpdate');
        stub.resolves({});
        complaints_controller.update(req, res);
    })

    it('deveria retornar status 200', function() {
      expect(res.status).to.be.equals(200);
    })
  })

  context('delete', function() {
    
    var req, res;
    before(function() {
        req = {params: {id: 'test'}};
        res = {status: 200, send: () => {}};
        var stub = sinon.stub(Complaint, 'findByIdAndRemove');
        stub.resolves({});
        complaints_controller.delete(req, res);
    })

    it('deveria retornar status 200', function() {
      expect(res.status).to.be.equals(200);
    })
  })

  context('groupLocaleByCompany', function() {
    
    var req, res;
    before(function() {
        req = {params: {id: 'test'}};
        res = {status: 200, send: () => {}};
        var stub = sinon.stub(Complaint, 'aggregate');
        stub.resolves({});
        complaints_controller.groupLocaleByCompany(req, res);
    })

    it('deveria retornar status 200', function() {
      expect(res.status).to.be.equals(200);
    })
  })

  context('calculateDistance', function() {
    
    var req, res;
    before(function() {
        req = {params: {id1: 'test', id2: 'test2'}};
        res = {status: 200, send: () => {}};
        complaints_controller.calculateDistance(req, res);
    })

    it('deveria retornar status 200', function() {
      expect(res.status).to.be.equals(200);
    })
  })

})
