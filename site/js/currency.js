// Simplistic currency type.

// Polyfill for missing in IE
Math.log10 = Math.log10 || function(x) {
  return Math.log(x) / Math.LN10;
};

/*global $ */
// 2-liner to stop JSLint complaining "'AYESEEEM' used out of scope" at the end
var AYESEEEM;
AYESEEEM = (function (module) {
  'use strict';

  function makeCurrency(symbol, subdivisions) {
    const currency = {
        getSymbol: function () {
          return symbol;
        },
        getSubdivisions: function () {
          return subdivisions;
        },
        getPrecision: function () {
          return Math.floor(Math.log10(subdivisions));
        }
      };

    // TODO: ICM 2016-11-25: Redundant? duplicated in Currency above?
    function getPrecision() {
      return Math.floor(Math.log10(subdivisions));
    }

    // Do this all ourselves while Safari (and mobiles) do not support
    // toLocaleString with locales/options arguments
    function format(value) {
      const valueFixedPrecision = value.toFixed(getPrecision());

      function insertThousandsSeparator(valueFixedPrecision) {
        let valueStr = '' + valueFixedPrecision;

        const sep = ',';
        const tailStrLength = '999.'.length + getPrecision();
        const splitPoint = valueStr.length - tailStrLength;

        if (valueStr.length > tailStrLength) {
          valueStr = valueStr.substring(0, splitPoint) + sep + valueStr.substring(splitPoint);
        }
        return valueStr;
      }

      const formattedValue = symbol + insertThousandsSeparator(valueFixedPrecision);
      return formattedValue;
    }

    currency.format = format;
    return currency;
  }

  // Module 'currency'
  module.currency = {
    makeCurrency: makeCurrency
  };

  return module;
}(AYESEEEM || {}));
