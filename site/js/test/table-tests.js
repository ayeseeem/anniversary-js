/*global QUnit, AYESEEEM */

(function () {
  'use strict';

  const table = AYESEEEM.table;
  const getData = table.getData;

  QUnit.module('Table Module');

  QUnit.test('module test is set up correctly', function (assert) {
    assert.equal(123, 123);
  });

  QUnit.module('Table getData()');

  QUnit.test('basic table read works', function (assert) {
    document.getElementById('qunit-fixture').innerHTML = `
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

    const testTable = document.getElementById('test-table');

    assert.deepEqual(getData(testTable, 1), [
      { 'date': '2010-02-16', 'price': '6.00' },
      { 'date': '2014-10-18', 'price': '8.80' },
      { 'date': '2015-05-29', 'price': '8.96' }
    ]);
  });

  QUnit.test('header rows are excluded', function (assert) {
    document.getElementById('qunit-fixture').innerHTML = `
    <table id="test-table">
      <thead>
        <tr><th>Quantity</th><th>Currency</th><th>Price</th><th>Date</th><th>Source</th></tr>
      </thead>
      <tbody>
        <tr><td>Thing 1</td><td>GBP</td><td>6.00</td><td>2010-02-16</td><td>Source 1</td></tr>
        <tr><td>Thing 2</td><td>GBP</td><td>8.80</td><td>2014-10-18</td><td>Source 2</td></tr>
        <tr><td>Thing 3</td><td>GBP</td><td>8.96</td><td>2015-05-29</td><td>Source 3</td></tr>
      </tbody>
    </table>
    `;

    const testTable = document.getElementById('test-table');

    assert.deepEqual(getData(testTable, 2), [
      { 'date': '2014-10-18', 'price': '8.80' },
      { 'date': '2015-05-29', 'price': '8.96' }
    ]);

    assert.deepEqual(getData(testTable, 3), [
      { 'date': '2015-05-29', 'price': '8.96' }
    ]);
  });

  QUnit.test('excludes all rows if header count matches row count', function (assert) {
    document.getElementById('qunit-fixture').innerHTML = `
    <table id="test-table">
      <thead>
        <tr><th>Quantity</th><th>Currency</th><th>Price</th><th>Date</th><th>Source</th></tr>
      </thead>
      <tbody>
        <tr><td>Thing 1</td><td>GBP</td><td>6.00</td><td>2010-02-16</td><td>Source 1</td></tr>
        <tr><td>Thing 2</td><td>GBP</td><td>8.80</td><td>2014-10-18</td><td>Source 2</td></tr>
        <tr><td>Thing 3</td><td>GBP</td><td>8.96</td><td>2015-05-29</td><td>Source 3</td></tr>
      </tbody>
    </table>
    `;

    const testTable = document.getElementById('test-table');

    assert.equal(testTable.rows.length, 4);
    assert.deepEqual(getData(testTable, 4), [
    ]);
  });

  QUnit.test('excludes all rows if header count *exceeds* row count', function (assert) {
    document.getElementById('qunit-fixture').innerHTML = `
    <table id="test-table">
      <thead>
        <tr><th>Quantity</th><th>Currency</th><th>Price</th><th>Date</th><th>Source</th></tr>
      </thead>
      <tbody>
        <tr><td>Thing 1</td><td>GBP</td><td>6.00</td><td>2010-02-16</td><td>Source 1</td></tr>
        <tr><td>Thing 2</td><td>GBP</td><td>8.80</td><td>2014-10-18</td><td>Source 2</td></tr>
        <tr><td>Thing 3</td><td>GBP</td><td>8.96</td><td>2015-05-29</td><td>Source 3</td></tr>
      </tbody>
    </table>
    `;

    const testTable = document.getElementById('test-table');

    assert.equal(testTable.rows.length, 4);
    assert.deepEqual(getData(testTable, 5), [
    ]);
  });

  QUnit.test('full table extracts header labels too', function (assert) {
    document.getElementById('qunit-fixture').innerHTML = `
    <table id="test-table">
      <thead>
        <tr><th>Quantity</th><th>Currency</th><th>Price</th><th>Date</th><th>Source</th></tr>
      </thead>
      <tbody>
        <tr><td>Thing 1</td><td>GBP</td><td>6.00</td><td>2010-02-16</td><td>Source 1</td></tr>
        <tr><td>Thing 2</td><td>GBP</td><td>8.80</td><td>2014-10-18</td><td>Source 2</td></tr>
        <tr><td>Thing 3</td><td>GBP</td><td>8.96</td><td>2015-05-29</td><td>Source 3</td></tr>
      </tbody>
    </table>
    `;

    const testTable = document.getElementById('test-table');

    assert.deepEqual(getData(testTable, 0)[0],
      { 'date': 'Date',       'price': 'Price' }
    );
    assert.deepEqual(getData(testTable, 0), [
      { 'date': 'Date',       'price': 'Price' },
      { 'date': '2010-02-16', 'price': '6.00' },
      { 'date': '2014-10-18', 'price': '8.80' },
      { 'date': '2015-05-29', 'price': '8.96' }
    ]);
  });

}());
