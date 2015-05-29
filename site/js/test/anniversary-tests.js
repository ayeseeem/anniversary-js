/*jslint indent : 2 */
/*global QUnit, AYESEEEM */

(function () {
  "use strict";

  QUnit.module("Top level");

  QUnit.test("Top-level namespace", function (assert) {
    assert.ok(AYESEEEM !== undefined);
  });

  QUnit.test("Example top-level anniversary test", function (assert) {
    var dummy = AYESEEEM.anniversary.dummy;
    assert.equal(dummy(), 123);
  });

}());
