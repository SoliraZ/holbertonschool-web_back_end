const { expect } = require('chai');
const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', () => {
  it('uses stubbed Utils.calculateNumber and logs expected message', () => {
    const calculateNumberStub = sinon.stub(Utils, 'calculateNumber').returns(10);
    const logSpy = sinon.spy(console, 'log');

    sendPaymentRequestToApi(100, 20);

    expect(calculateNumberStub.calledOnceWithExactly('SUM', 100, 20)).to.equal(true);
    expect(logSpy.calledOnceWithExactly('The total is: 10')).to.equal(true);

    calculateNumberStub.restore();
    logSpy.restore();
  });
});
