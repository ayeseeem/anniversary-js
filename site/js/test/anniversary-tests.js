/*jslint indent : 2 */
/*global QUnit, AYESEEEM */

(function () {
  "use strict";

  QUnit.module("Top level");

  QUnit.test("Top-level namespace", function (assert) {
    assert.ok(AYESEEEM !== undefined);
  });

  QUnit.test("is_celebratable_number", function (assert) {
    var is_celebratable_number = AYESEEEM.anniversary.is_celebratable_number;

    assert.equal(is_celebratable_number(6), 6);
    assert.equal(is_celebratable_number(7), 7);
    assert.equal(is_celebratable_number(8), 8);

    assert.equal(is_celebratable_number(69), 0);
    assert.equal(is_celebratable_number(70), 70);
    assert.equal(is_celebratable_number(71), 0);

    assert.equal(is_celebratable_number(699), 0);
    assert.equal(is_celebratable_number(700), 700);
    assert.equal(is_celebratable_number(701), 0);
  });

  // takes 1-indexed months (January = 1)
  function date(year, month, day) {
    return new Date(year, month - 1, day);
  }

  var is_month_diff = AYESEEEM.anniversary.is_month_diff;

  QUnit.test("is_month_diff - Test spec 1", function (assert) {
    assert.equal(is_month_diff(date(2009, 1, 13), date(2009, 3, 12)), 0);
    assert.equal(is_month_diff(date(2009, 1, 13), date(2009, 3, 13)), 2);
    assert.equal(is_month_diff(date(2009, 1, 13), date(2009, 3, 14)), 0);
  });

  QUnit.test("is_month_diff - Test spec 2 - short months", function (assert) {
    assert.equal(is_month_diff(date(2009, 1, 30), date(2009, 2, 28)), 0);
    assert.equal(is_month_diff(date(2009, 1, 30), date(2009, 3, 30)), 2);
  });

  QUnit.test("is_month_diff - Test spec 3 - reverse order: oldest last", function (assert) {
    assert.equal(is_month_diff(date(2009, 3, 13), date(2009, 1, 12)), 0);
    assert.equal(is_month_diff(date(2009, 3, 13), date(2009, 1, 13)), -2);
    assert.equal(is_month_diff(date(2009, 3, 13), date(2009, 1, 14)), 0);
  });

  QUnit.test("is_month_diff - Test spec 4 - Duplicate dates is no diffence in months", function (assert) {
    assert.equal(is_month_diff(date(2009, 3, 13), date(2009, 3, 13)), 0);
  });

  QUnit.test("is_month_diff - Test spec 5 - One month works", function (assert) {
    assert.equal(is_month_diff(date(2009, 3, 13), date(2009, 4, 13)), 1);
  });

}());
