// HTML/DOM table processing.

/*global $ */
// 2-liner to stop JSLint complaining "'AYESEEEM' used out of scope" at the end
var AYESEEEM;
AYESEEEM = (function (module) {
  'use strict';

  function getData(table, headerRowsCount) {
    // TODO: ICM 2022-12-19: Extract column headers from table
    const priceColumnIndex = 2;
    const dateColumnIndex = 3;

    const points = [];
    const rowCount = table.rows.length;
    for (var i = 0 + headerRowsCount; i < rowCount; i++) {
      var cells = table.rows.item(i).cells;

      const point = {};
      var cellCount = cells.length;
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
   * A "dumber" version that just reads (all) the data. Let others process it
   * later.
   *
   * @param {*} table table DOM element
   * @returns all the `innerHTML` of the cells, in an array of arrays
   */
  function getAllData(table) {
    // TODO: ICM 2022-12-22: Verify it's a table element
    const points = [];
    const rowCount = table.rows.length;
    for (var i = 0; i < rowCount; i++) {
      var cells = table.rows.item(i).cells;

      const point = [];
      var cellCount = cells.length;
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
    getAllData: getAllData
  };

  return module;
}(AYESEEEM || {}));
