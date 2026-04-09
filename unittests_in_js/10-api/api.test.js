const { expect } = require('chai');
const request = require('request');

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

  it('returns status code 404 when :id is NOT a number', (done) => {
    request('http://localhost:7865/cart/hello', (error, response) => {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it('returns status code 404 when :id contains non-digit characters', (done) => {
    request('http://localhost:7865/cart/12abc', (error, response) => {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});

describe('Available payments', () => {
  it('returns status code 200', (done) => {
    request('http://localhost:7865/available_payments', (error, response) => {
      expect(error).to.equal(null);
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('returns the correct payment methods object', (done) => {
    request(
      { url: 'http://localhost:7865/available_payments', json: true },
      (error, response, body) => {
        expect(error).to.equal(null);
        expect(response.statusCode).to.equal(200);
        expect(body).to.deep.equal({
          payment_methods: {
            credit_cards: true,
            paypal: false,
          },
        });
        done();
      },
    );
  });
});

describe('Login', () => {
  it('returns status code 200', (done) => {
    request.post(
      {
        url: 'http://localhost:7865/login',
        json: { userName: 'Betty' },
      },
      (error, response) => {
        expect(error).to.equal(null);
        expect(response.statusCode).to.equal(200);
        done();
      },
    );
  });

  it('returns Welcome :username for the given userName', (done) => {
    request.post(
      {
        url: 'http://localhost:7865/login',
        json: { userName: 'Betty' },
      },
      (error, response, body) => {
        expect(error).to.equal(null);
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Welcome Betty');
        done();
      },
    );
  });

  it('returns Welcome with a different userName', (done) => {
    request.post(
      {
        url: 'http://localhost:7865/login',
        json: { userName: 'Bob' },
      },
      (error, response, body) => {
        expect(error).to.equal(null);
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Welcome Bob');
        done();
      },
    );
  });
});
