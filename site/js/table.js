// HTML/DOM table processing.

/*global $ */
// 2-liner to stop JSLint complaining "'AYESEEEM' used out of scope" at the end
var AYESEEEM;
AYESEEEM = (function (module) {
  'use strict';

  function getData(oTable, headerRowsCount) {
    // TODO: ICM 2022-12-19: Extract column headers from table
    const priceColumnIndex = 2;
    const dateColumnIndex = 3;

    const points = [];
    const rowCount = oTable.rows.length;
    for (var i = 0 + headerRowsCount; i < rowCount; i++) {

      // gets cells of current row
      var oCells = oTable.rows.item(i).cells;

      // gets amount of cells of current row
      var cellLength = oCells.length;

      const point = {};
      // loops through each cell in current row
      for (var j = 0; j < cellLength; j++){
        const cellVal = oCells.item(j).innerHTML;

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
   * @param {*} oTable table DOM element
   * @returns all the `innerHTML` of the cells, in an array of arrays
   */
  function getAllData(oTable) {
    // TODO: ICM 2022-12-22: Verify it's a table element
    const points = [];
    const rowCount = oTable.rows.length;
    for (var i = 0; i < rowCount; i++) {

      // gets cells of current row
      var oCells = oTable.rows.item(i).cells;

      // gets amount of cells of current row
      var cellLength = oCells.length;

      const point = [];
      // loops through each cell in current row
      for (var j = 0; j < cellLength; j++){
        const cellVal = oCells.item(j).innerHTML;
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
