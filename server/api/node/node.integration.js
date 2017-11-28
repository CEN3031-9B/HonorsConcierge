'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newNode;

describe('Node API:', function() {
  describe('GET /api/nodes', function() {
    var nodes;

    beforeEach(function(done) {
      request(app)
        .get('/api/nodes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          nodes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(nodes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/nodes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/nodes')
        .send({
          title: 'New Node',
          description: 'This is the brand new node!!!',
          content: 'Node content text'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newNode = res.body;
          done();
        });
    });

    it('should respond with the newly created node', function() {
      expect(newNode.title).to.equal('New Node');
      expect(newNode.description).to.equal('This is the brand new node!!!');
    });
  });

  describe('GET /api/nodes/:id', function() {
    var node;

    beforeEach(function(done) {
      request(app)
        .get(`/api/nodes/${newNode._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          node = res.body;
          done();
        });
    });

    afterEach(function() {
      node = {};
    });

    it('should respond with the requested node', function() {
      expect(node.title).to.equal('New Node');
      expect(node.description).to.equal('This is the brand new node!!!');
    });
  });

  describe('PUT /api/nodes/:id', function() {
    var updatedNode;

    beforeEach(function(done) {
      request(app)
        .put(`/api/nodes/${newNode._id}`)
        .send({
          title: 'Updated Node',
          description: 'This is the updated node!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedNode = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNode = {};
    });

    it('should respond with the updated node', function() {
      expect(updatedNode.title).to.equal('Updated Node');
      expect(updatedNode.description).to.equal('This is the updated node!!!');
    });

    it('should respond with the updated node on a subsequent GET', function(done) {
      request(app)
        .get(`/api/nodes/${newNode._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let node = res.body;

          expect(node.title).to.equal('Updated Node');
          expect(node.description).to.equal('This is the updated node!!!');

          done();
        });
    });
  });

  describe('PATCH /api/nodes/:id', function() {
    var patchedNode;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/nodes/${newNode._id}`)
        .send([
          { op: 'replace', path: '/title', value: 'Patched Node' },
          { op: 'replace', path: '/description', value: 'This is the patched node!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedNode = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedNode = {};
    });

    it('should respond with the patched node', function() {
      expect(patchedNode.title).to.equal('Patched Node');
      expect(patchedNode.description).to.equal('This is the patched node!!!');
    });
  });

  describe('DELETE /api/nodes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/nodes/${newNode._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when node does not exist', function(done) {
      request(app)
        .delete(`/api/nodes/${newNode._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
