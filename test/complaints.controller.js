var expect = require('chai').expect;
var complaints_controller = require('../app/controllers/complaints.controller');
const Complaint = require('../app/models/complaint.model.js');
const { mockRequest, mockResponse } = require('mock-req-res');
const sinon = require('sinon');
const mongoose = require('mongoose');

describe('complaints.controller', function() {

  context('create', function() {
    
    var req, res;
    before(function() {
        req = mockRequest({body: {description: 'test'}});
        res = mockResponse({});
        var sandbox = sinon.sandbox.create();
        sandbox.stub(Complaint.prototype, 'save').resolves({ title: 'title'});
        complaints_controller.create(req, res);
    })


    it('deveria criar um objeto com propriedade title', function() {
        console.log('res', res);
      expect(res.body).to.have.property('title');
    })
  })

})
