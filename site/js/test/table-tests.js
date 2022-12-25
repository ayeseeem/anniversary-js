/*global QUnit, AYESEEEM */

(function () {
  'use strict';

  const table = AYESEEEM.table;

  QUnit.module('Table Module');

  QUnit.test('module test is set up correctly', function (assert) {
    assert.equal(123, 123);
  });

  QUnit.module('Table getData()');

  const getData = table.getData;

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

  QUnit.module('Table getDataGrid()');

  const getDataGrid = table.getDataGrid;

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

    assert.deepEqual(getDataGrid(testTable, 1), [
      [ '6.00', '2010-02-16' ],
      [ '8.80', '2014-10-18' ],
      [ '8.96', '2015-05-29' ]
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

    assert.deepEqual(getDataGrid(testTable, 2), [
      [ '8.80', '2014-10-18' ],
      [ '8.96', '2015-05-29' ]
    ]);

    assert.deepEqual(getDataGrid(testTable, 3), [
      [ '8.96', '2015-05-29' ]
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
    assert.deepEqual(getDataGrid(testTable, 4), [
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
    assert.deepEqual(getDataGrid(testTable, 5), [
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

    assert.deepEqual(getDataGrid(testTable, 0)[0],
      [ 'Price', 'Date' ]
    );
    assert.deepEqual(getDataGrid(testTable, 0), [
      [ 'Price', 'Date'       ],
      [ '6.00',  '2010-02-16' ],
      [ '8.80',  '2014-10-18' ],
      [ '8.96',  '2015-05-29' ]
    ]);
  });

  // @Characterization
  QUnit.test('Gets data in original table order', function (assert) {
    document.getElementById('qunit-fixture').innerHTML = `
    <table id="test-table">
      <thead>
        <tr><th>C1 Head</th><th>C2 Head</th><th>C3 Head</th><th>C4 Head</th></tr>
      </thead>
      <tbody>
        <tr><td>R1 C1</td><td>R1 C2</td><td>R1 C3</td><td>R1 C4</td></tr>
        <tr><td>R2 C1</td><td>R2 C2</td><td>R2 C3</td><td>R2 C4</td></tr>
        <tr><td>R3 C1</td><td>R3 C2</td><td>R3 C3</td><td>R3 C4</td></tr>
      </tbody>
    </table>
    `;

    const testTable = document.getElementById('test-table');
    assert.deepEqual(getDataGrid(testTable, 0), [
      [ 'C3 Head', 'C4 Head' ],
      [ 'R1 C3', 'R1 C4' ],
      [ 'R2 C3', 'R2 C4' ],
      [ 'R3 C3', 'R3 C4' ],
    ]);
  });

  QUnit.module('Table getAllData()');

  const getAllData = table.getAllData;

  QUnit.test('read all table works', function (assert) {
    document.getElementById('qunit-fixture').innerHTML = `
    <table id="test-table">
      <thead>
        <tr><th>C1 Head</th><th>C2 Head</th><th>C3 Head</th><th>C4 Head</th></tr>
      </thead>
      <tbody>
        <tr><td>R1 C1</td><td>R1 C2</td><td>R1 C3</td><td>R1 C4</td></tr>
        <tr><td>R2 C1</td><td>R2 C2</td><td>R2 C3</td><td>R2 C4</td></tr>
        <tr><td>R3 C1</td><td>R3 C2</td><td>R3 C3</td><td>R3 C4</td></tr>
      </tbody>
    </table>
    `;

    const testTable = document.getElementById('test-table');

    assert.deepEqual(getAllData(testTable), [
      [ 'C1 Head', 'C2 Head', 'C3 Head', 'C4 Head' ],
      [ 'R1 C1', 'R1 C2', 'R1 C3', 'R1 C4' ],
      [ 'R2 C1', 'R2 C2', 'R2 C3', 'R2 C4' ],
      [ 'R3 C1', 'R3 C2', 'R3 C3', 'R3 C4' ],
    ]);
  });

}());
