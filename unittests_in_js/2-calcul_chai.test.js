const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', () => {
  describe('SUM', () => {
    it('adds rounded values', () => {
      expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
      expect(calculateNumber('SUM', 1.2, 3.7)).to.equal(5);
    });

    it('handles rounding boundaries', () => {
      expect(calculateNumber('SUM', 1.49, 2.49)).to.equal(3);
      expect(calculateNumber('SUM', 1.5, 2.5)).to.equal(5);
    });
  });

  describe('SUBTRACT', () => {
    it('subtracts rounded b from rounded a', () => {
      expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
      expect(calculateNumber('SUBTRACT', 4.7, 1.2)).to.equal(4);
    });

    it('handles negative values', () => {
      expect(calculateNumber('SUBTRACT', -1.2, -3.7)).to.equal(3);
    });
  });

  describe('DIVIDE', () => {
    it('divides rounded a by rounded b', () => {
      expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
      expect(calculateNumber('DIVIDE', 4.6, 2.2)).to.equal(2.5);
    });

    it('returns Error when rounded b is 0', () => {
      expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
      expect(calculateNumber('DIVIDE', 1.4, 0.2)).to.equal('Error');
      expect(calculateNumber('DIVIDE', 1.4, -0.2)).to.equal('Error');
    });
  });
});
