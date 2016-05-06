/*jslint indent : 2 */
/*global QUnit, AYESEEEM */

(function () {
  'use strict';

  var ann = AYESEEEM.anniversary,
    isMonthDiff = ann.isMonthDiff,
    calculateSaving = ann.calculateSaving,
    dateDiffAsWholeDays = ann.dateDiffAsWholeDays,
    dateDiffAsWeeks = ann.dateDiffAsWeeks;

  QUnit.module('Anniversary Module');

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

  QUnit.test('dateDiffAsWholeDays - one day', function (assert) {
    var t1 = new Date(Date.parse('2009-11-03T08:30')),
      t2 = new Date(Date.parse('2009-11-04T08:30')),
      tDelta = new Date(t2.getTime() - t1.getTime()),
      days = dateDiffAsWholeDays(tDelta);
    assert.equal(days, 1);
  });

  QUnit.test('dateDiffAsWholeDays returns whole numbers not fractions', function (assert) {
    var t1 = new Date(Date.parse('2009-11-03T08:30')),
      t2 = new Date(Date.parse('2009-11-04T20:30')),
      tDelta = new Date(t2.getTime() - t1.getTime()),
      days = dateDiffAsWholeDays(tDelta);
    assert.equal(days, 1);
    assert.notEqual(days, 1.5);
  });

  QUnit.test('dateDiffAsWholeDays - two days', function (assert) {
    var t1 = new Date(Date.parse('2009-11-03T08:30')),
      t2 = new Date(Date.parse('2009-11-05T08:30')),
      tDelta = new Date(t2.getTime() - t1.getTime()),
      days = dateDiffAsWholeDays(tDelta);
    assert.equal(days, 2);
  });

  QUnit.test('dateDiffAsWholeDays - exact year', function (assert) {
    var t1 = new Date(Date.parse('2009-11-03T08:30')),
      t2 = new Date(Date.parse('2015-11-03T08:30')),
      tDelta = new Date(t2.getTime() - t1.getTime()),
      days = dateDiffAsWholeDays(tDelta);
    assert.equal(days, (365 * 6) + 1);  // 1 leap year
    assert.equal((365 * 6) + 1, 2191);
  });

  QUnit.test('dateDiffAsWeeks - one week', function (assert) {
    var t1 = new Date(Date.parse('2009-11-03T08:30')),
      t2 = new Date(Date.parse('2009-11-10T08:30')),
      tDelta = new Date(t2.getTime() - t1.getTime()),
      weeks = dateDiffAsWeeks(tDelta);
    assert.equal(weeks, 1);
  });

  QUnit.test('dateDiffAsWeeks returns fractions not whole numbers', function (assert) {
    var t1 = new Date(Date.parse('2009-11-03T08:30')),
      t2 = new Date(Date.parse('2009-11-06T20:30')),
      tDelta = new Date(t2.getTime() - t1.getTime()),
      weeks = dateDiffAsWeeks(tDelta);
    assert.notEqual(weeks, 0);
    assert.equal(weeks, 0.5);
    assert.notEqual(weeks, 1);
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

  QUnit.test('toFixed Examples', function (assert) {
    var x = 0;
    assert.equal('' + x.toFixed(2), '0.00');
  });

  QUnit.test('calculateSaving pads pennies', function (assert) {
    assert.equal(calculateSaving(0), '£0.00');
  });

}());
