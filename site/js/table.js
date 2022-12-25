// HTML/DOM table processing.

/*global $ */
// 2-liner to stop JSLint complaining "'AYESEEEM' used out of scope" at the end
var AYESEEEM;
AYESEEEM = (function (module) {
  'use strict';

  /**
   * Gets rows of data from table as objects.
   * @param {HTMLTableElement} table table to get data from
   * @param {Integer} headerRowsCount number of header rows
   * @returns an array of objects
   */
  // TODO: ICM 2022-12-22: Refactor to use getData()
  function getData(table, headerRowsCount) {
    // TODO: ICM 2022-12-19: Extract column headers from table
    const priceColumnIndex = 2;
    const dateColumnIndex = 3;

    const points = [];
    const rowCount = table.rows.length;
    for (var i = 0 + headerRowsCount; i < rowCount; i++) {
      const cells = table.rows.item(i).cells;

      const point = {};
      const cellCount = cells.length;
      for (var j = 0; j < cellCount; j++){
        const cellVal = cells.item(j).innerHTML;

        if (j === priceColumnIndex) {
          point['price'] = cellVal;
        }

        if (j === dateColumnIndex) {
          point['date'] = cellVal;
        }
      }
      points.push(point);
    }

    return points;
  }

  /**
   * Gets rows of data from table as arrays.
   * @param {HTMLTableElement} table table to get data from
   * @param {Integer} headerRowsCount number of header rows
   * @returns an array of arrays
   */
  function getDataGrid(table, headerRowsCount) {
    const priceColumnIndex = 2;
    const dateColumnIndex = 3;

    const points = [];
    const rowCount = table.rows.length;
    for (var i = 0 + headerRowsCount; i < rowCount; i++) {
      const cells = table.rows.item(i).cells;

      const point = [];
      const cellCount = cells.length;
      for (var j = 0; j < cellCount; j++){
        const cellVal = cells.item(j).innerHTML;

        if (j === priceColumnIndex) {
          point.push(cellVal);
        }

        if (j === dateColumnIndex) {
          point.push(cellVal);
        }
      }
      points.push(point);
    }

    return points;
  }

  /**
   * A "dumber" version that just reads (all) the data. Let others process it
   * later.
   *
   * @param {*} table table DOM element
   * @returns all the `innerHTML` of the cells, in an array of arrays
   */
  // TODO: ICM 2022-12-25: Rename as getAllDataGrid()
  function getAllData(table) {
    // TODO: ICM 2022-12-22: Verify it's a table element
    const points = [];
    const rowCount = table.rows.length;
    for (var i = 0; i < rowCount; i++) {
      const cells = table.rows.item(i).cells;

      const point = [];
      const cellCount = cells.length;
      for (var j = 0; j < cellCount; j++){
        const cellVal = cells.item(j).innerHTML;
        point.push(cellVal);
      }
      points.push(point);
    }

    return points;
  }

  module.table = {
    getData: getData,
    getDataGrid: getDataGrid,
    getAllData: getAllData
  };

  return module;
}(AYESEEEM || {}));
