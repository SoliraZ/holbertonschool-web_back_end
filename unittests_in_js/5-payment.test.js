const { expect } = require('chai');
const sinon = require('sinon');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    logSpy.restore();
  });

  it('logs correct total for 100 and 20', () => {
    sendPaymentRequestToApi(100, 20);

    expect(logSpy.calledOnceWithExactly('The total is: 120')).to.equal(true);
    expect(logSpy.calledOnce).to.equal(true);
  });

  it('logs correct total for 10 and 10', () => {
    sendPaymentRequestToApi(10, 10);

    expect(logSpy.calledOnceWithExactly('The total is: 20')).to.equal(true);
    expect(logSpy.calledOnce).to.equal(true);
  });
});
