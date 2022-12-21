// HTML/DOM table processing.

/*global $ */
// 2-liner to stop JSLint complaining "'AYESEEEM' used out of scope" at the end
var AYESEEEM;
AYESEEEM = (function (module) {
  'use strict';

  function getData(oTable) {
    const headerRowsCount = 1;

    const rowLength = oTable.rows.length;

    // TODO: ICM 2022-12-19: Extract column headers from table
    const priceColumnIndex = 2;
    const dateColumnIndex = 3;

    const points = [];
    for (var i = 0 + headerRowsCount; i < rowLength; i++){

      // gets cells of current row
      var oCells = oTable.rows.item(i).cells;

      // gets amount of cells of current row
      var cellLength = oCells.length;

      const point = {};
      // loops through each cell in current row
      for (var j = 0; j < cellLength; j++){
        const cellVal = oCells.item(j).innerHTML;

        if (j == priceColumnIndex) {
          point['price'] = cellVal;
        }

        if (j == dateColumnIndex) {
          point['date'] = cellVal;
        }
      }
      points.push(point);
    }

    return points;
  }

  module.table = {
    getData: getData
  };

  return module;
}(AYESEEEM || {}));
