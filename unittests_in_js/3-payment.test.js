const { expect } = require('chai');
const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  it('uses Utils.calculateNumber with SUM and provided args', () => {
    const calcSpy = sinon.spy(Utils, 'calculateNumber');
    const logSpy = sinon.spy(console, 'log');

    sendPaymentRequestToApi(100, 20);

    expect(calcSpy.calledOnceWithExactly('SUM', 100, 20)).to.equal(true);
    expect(logSpy.calledOnceWithExactly('The total is: 120')).to.equal(true);

    calcSpy.restore();
    logSpy.restore();
  });
});
