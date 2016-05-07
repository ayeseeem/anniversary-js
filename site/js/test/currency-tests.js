/*jslint indent : 2 */
/*global QUnit, AYESEEEM */

(function () {
  'use strict';

  var cur = AYESEEEM.currency,
    makeCurrency = cur.makeCurrency;

  QUnit.module('Currency Module');

  var currency = makeCurrency('£', 100);

  QUnit.test('format example - units', function (assert) {
    assert.equal(currency.format(0), '£0.00');
    assert.equal(currency.format(1), '£1.00');
  });

  QUnit.test('format "pennies"', function (assert) {
    assert.equal(currency.format(1.23), '£1.23');
  });

  QUnit.test('format thousands', function (assert) {
    assert.equal(currency.format(1000), '£1,000.00');
  });

  QUnit.test('format full range', function (assert) {
    assert.equal(currency.format(0), '£0.00');
    assert.equal(currency.format(0.01), '£0.01');
    assert.equal(currency.format(0.99), '£0.99');
    assert.equal(currency.format(1), '£1.00');
    assert.equal(currency.format(10), '£10.00');
    assert.equal(currency.format(100), '£100.00');
    assert.equal(currency.format(1000), '£1,000.00');
    assert.equal(currency.format(10000), '£10,000.00');
    assert.equal(currency.format(100000), '£100,000.00');
  });

  QUnit.test('format millions not yet supported', function (assert) {
    assert.equal(currency.format(1000000), '£1000,000.00');
    assert.notEqual(currency.format(1000000), '£1,000,000.00');
  });

  QUnit.test('format Symbol', function (assert) {
    assert.equal(makeCurrency('Xyz', 100).format(1.23), 'Xyz1.23');
  });

  QUnit.test('format "pennies" of other sizes', function (assert) {
    assert.equal(makeCurrency('X', 1000).format(1.234), 'X1.234');
  });

  QUnit.test('format thousands with other symbols and "pennies"', function (assert) {
    assert.equal(makeCurrency('Xyz', 1000).format(1000), 'Xyz1,000.000');
  });

  QUnit.test('symbol', function (assert) {
    assert.equal(makeCurrency('Xyz', 1000).getSymbol(), 'Xyz');
  });

  QUnit.test('subdivisions', function (assert) {
    assert.equal(makeCurrency('Xyz', 1000).getSubdivisions(), 1000);
  });

  QUnit.test('precision', function (assert) {
    assert.equal(makeCurrency('Xyz', 100).getPrecision(), 2);
    assert.equal(makeCurrency('Xyz', 1000).getPrecision(), 3);
  });

}());
