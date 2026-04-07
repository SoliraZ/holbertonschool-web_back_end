const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', () => {
  describe('SUM', () => {
    it('adds rounded values', () => {
      assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
      assert.strictEqual(calculateNumber('SUM', 1.2, 3.7), 5);
    });

    it('handles rounding boundaries', () => {
      assert.strictEqual(calculateNumber('SUM', 1.49, 2.49), 3);
      assert.strictEqual(calculateNumber('SUM', 1.5, 2.5), 5);
    });
  });

  describe('SUBTRACT', () => {
    it('subtracts rounded b from rounded a', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
      assert.strictEqual(calculateNumber('SUBTRACT', 4.7, 1.2), 4);
    });

    it('handles negative values', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', -1.2, -3.7), 3);
    });
  });

  describe('DIVIDE', () => {
    it('divides rounded a by rounded b', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
      assert.strictEqual(calculateNumber('DIVIDE', 4.6, 2.2), 2.5);
    });

    it('returns Error when rounded b is 0', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0.2), 'Error');
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, -0.2), 'Error');
    });
  });
});
