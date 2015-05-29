/*jslint indent : 2 */
/*global QUnit, AYESEEEM */

(function () {
  "use strict";

  QUnit.module("Top level");

  QUnit.test("Top-level namespace", function (assert) {
    assert.ok(AYESEEEM !== undefined);
  });

  QUnit.test("is_celebratable_number", function (assert) {
    var test = AYESEEEM.anniversary.is_celebratable_number;

    assert.equal(test(6), 6);
    assert.equal(test(7), 7);
    assert.equal(test(8), 8);

    assert.equal(test(69), 0);
    assert.equal(test(70), 70);
    assert.equal(test(71), 0);

    assert.equal(test(699), 0);
    assert.equal(test(700), 700);
    assert.equal(test(701), 0);

  });

}());
