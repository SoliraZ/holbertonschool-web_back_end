const { expect } = require('chai');
const request = require('request');

let server;

describe('API', () => {
  before((done) => {
    delete require.cache[require.resolve('./api.js')];
    server = require('./api.js');
    server.once('listening', done);
  });

  after((done) => {
    server.close(done);
  });

  describe('Index page', () => {
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

  describe('Cart page', () => {
    it('returns status code 200 when :id is a number', (done) => {
      request('http://localhost:7865/cart/12', (error, response, body) => {
        expect(error).to.equal(null);
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Payment methods for cart 12');
        done();
      });
    });

    it('returns the correct body for a numeric :id', (done) => {
      request('http://localhost:7865/cart/7', (error, response, body) => {
        expect(error).to.equal(null);
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Payment methods for cart 7');
        done();
      });
    });

    it('returns status code 404 when :id is NOT a number', (done) => {
      request('http://localhost:7865/cart/hello', (error, response) => {
        expect(error).to.equal(null);
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('returns status code 404 when :id contains non-digits', (done) => {
      request('http://localhost:7865/cart/12abc', (error, response) => {
        expect(error).to.equal(null);
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});
