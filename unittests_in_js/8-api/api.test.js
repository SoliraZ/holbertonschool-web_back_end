const { expect } = require('chai');
const request = require('request');

describe('Index page', () => {
  let server;

  before(() => {
    server = require('./api');
  });

  after((done) => {
    server.close(done);
  });

  it('returns status code 200', (done) => {
    request('http://localhost:7865', (error, response) => {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('returns the correct response body', (done) => {
    request('http://localhost:7865', (error, response, body) => {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });
});
