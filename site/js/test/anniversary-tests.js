/*jslint indent : 2 */
/*global QUnit, AYESEEEM */

(function () {
  'use strict';

  var ann = AYESEEEM.anniversary,
    isMonthDiff = ann.isMonthDiff,
    calculateSaving = ann.calculateSaving;

  QUnit.module('Top level');

  QUnit.test('Top-level namespace', function (assert) {
    assert.ok(AYESEEEM !== undefined);
  });

  QUnit.test('isCelebratableNumber', function (assert) {
    var isCelebratableNumber = AYESEEEM.anniversary.isCelebratableNumber;

    assert.equal(isCelebratableNumber(6), 6);
    assert.equal(isCelebratableNumber(7), 7);
    assert.equal(isCelebratableNumber(8), 8);

    assert.equal(isCelebratableNumber(69), 0);
    assert.equal(isCelebratableNumber(70), 70);
    assert.equal(isCelebratableNumber(71), 0);

    assert.equal(isCelebratableNumber(699), 0);
    assert.equal(isCelebratableNumber(700), 700);
    assert.equal(isCelebratableNumber(701), 0);

    assert.equal(isCelebratableNumber(6999), 0);
    assert.equal(isCelebratableNumber(7000), 7000);
    assert.equal(isCelebratableNumber(7001), 0);
  });

  // takes 1-indexed months (January = 1)
  function date(year, month, day) {
    return new Date(year, month - 1, day);
  }

  QUnit.test('isMonthDiff - Test spec 1', function (assert) {
    assert.equal(isMonthDiff(date(2009, 1, 13), date(2009, 3, 12)), 0);
    assert.equal(isMonthDiff(date(2009, 1, 13), date(2009, 3, 13)), 2);
    assert.equal(isMonthDiff(date(2009, 1, 13), date(2009, 3, 14)), 0);
  });

  QUnit.test('isMonthDiff - Test spec 2 - short months', function (assert) {
    assert.equal(isMonthDiff(date(2009, 1, 30), date(2009, 2, 28)), 0);
    assert.equal(isMonthDiff(date(2009, 1, 30), date(2009, 3, 30)), 2);
  });

  QUnit.test('isMonthDiff - Test spec 3 - reverse order: oldest last', function (assert) {
    assert.equal(isMonthDiff(date(2009, 3, 13), date(2009, 1, 12)), 0);
    assert.equal(isMonthDiff(date(2009, 3, 13), date(2009, 1, 13)), -2);
    assert.equal(isMonthDiff(date(2009, 3, 13), date(2009, 1, 14)), 0);
  });

  QUnit.test('isMonthDiff - Test spec 4 - Duplicate dates is no diffence in months', function (assert) {
    assert.equal(isMonthDiff(date(2009, 3, 13), date(2009, 3, 13)), 0);
  });

  QUnit.test('isMonthDiff - Test spec 5 - One month works', function (assert) {
    assert.equal(isMonthDiff(date(2009, 3, 13), date(2009, 4, 13)), 1);
  });

  QUnit.module('Cash and Savings');

  QUnit.test('calculateSaving - default symbol', function (assert) {
    assert.ok(calculateSaving(1)[0] === '£');
  });

  QUnit.test('calculateSaving - one week default saving', function (assert) {
    assert.equal(calculateSaving(1), '£83.07');
  });

  QUnit.test('calculateSaving - multiple weeks default saving', function (assert) {
    var p = 8307;
    assert.equal(calculateSaving(1), '£' + (p / 100));
    assert.equal(calculateSaving(2), '£' + (2 * p / 100));
    assert.equal(calculateSaving(9), '£' + (9 * p / 100));
  });

}());
