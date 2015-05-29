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

}());
