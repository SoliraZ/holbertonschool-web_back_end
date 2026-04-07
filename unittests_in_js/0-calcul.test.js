const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
  describe('integer values', () => {
    it('returns direct sum when both values are integers', () => {
      assert.strictEqual(calculateNumber(1, 3), 4);
    });
  });

  describe('rounding decimals', () => {
    it('rounds b up when decimal part is greater than 0.5', () => {
      assert.strictEqual(calculateNumber(1, 3.7), 5);
    });

    it('rounds a down when decimal part is less than 0.5', () => {
      assert.strictEqual(calculateNumber(1.2, 3), 4);
    });

    it('rounds a up when decimal part is equal to 0.5', () => {
      assert.strictEqual(calculateNumber(1.5, 3), 5);
    });

    it('rounds both values before adding', () => {
      assert.strictEqual(calculateNumber(1.2, 3.7), 5);
      assert.strictEqual(calculateNumber(1.5, 3.7), 6);
    });
  });

  describe('edge cases around 0.5 threshold', () => {
    it('rounds values just below 0.5 down', () => {
      assert.strictEqual(calculateNumber(2.4999, 1.4999), 3);
    });

    it('rounds values at 0.5 up', () => {
      assert.strictEqual(calculateNumber(2.5, 1.5), 5);
    });

    it('rounds values just above 0.5 up', () => {
      assert.strictEqual(calculateNumber(2.5001, 1.5001), 5);
    });
  });

  describe('zero and negative values', () => {
    it('handles decimals that round to 0', () => {
      assert.strictEqual(calculateNumber(0.2, 0.2), 0);
    });

    it('handles mixed sign values correctly', () => {
      assert.strictEqual(calculateNumber(-1.2, 3.7), 3);
    });

    it('handles negative values around threshold', () => {
      assert.strictEqual(calculateNumber(-1.5, -2.5), -3);
      assert.strictEqual(calculateNumber(-1.49, -2.49), -3);
    });
  });
});
