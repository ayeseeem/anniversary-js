/*global QUnit, AYESEEEM */

(function () {
  'use strict';

  const table = AYESEEEM.table;
  const getData = table.getData;

  QUnit.module('Table Module');

  QUnit.test('module test is set up correctly', function (assert) {
    assert.equal(123, 123);
  });

  QUnit.test('basic table read works', function (assert) {
    const dom = document.getElementById('qunit-fixture');
    const testTableHtml = `
    <table id="test-table">
      <thead>
        <tr><th>Quantity</th>  <th>Currency</th><th>Price</th><th>Date</th><th>Source</th>  </tr>
      </thead>
      <tbody>
        <tr><td>pack of 20</td><td>GBP</td><td>6.00</td><td>2010-02-16</td><td>Source 1</td></tr>
        <tr><td>pack of 20</td><td>GBP</td><td>8.80</td><td>2014-10-18</td><td>Source 2</td></tr>
        <tr><td>pack of 20</td><td>GBP</td><td>8.96</td><td>2015-05-29</td><td>Source 3</td></tr>
      </tbody>
    </table>
    `;
    dom.innerHTML = testTableHtml;

    const testTable = document.getElementById('test-table');
    const data = getData(testTable);
    console.log(data);

    assert.equal(data.length, 3);
    assert.equal(Object.keys(data[0]).length, 2);
    assert.equal(Object.keys(data[1]).length, 2);
    assert.equal(Object.keys(data[2]).length, 2);
    const expected = [
      { 'date': '2010-02-16', 'price': '6.00' },
      { 'date': '2014-10-18', 'price': '8.80' },
      { 'date': '2015-05-29', 'price': '8.96'}
    ];
    assert.deepEqual(data, expected);
  });

}());
