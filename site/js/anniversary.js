// Celebrate a passed date.

// Polyfill for missing in IE
Math.log10 = Math.log10 || function(x) {
  return Math.log(x) / Math.LN10;
};

/*global $ */
// 2-liner to stop JSLint complaining "'AYESEEEM' used out of scope" at the end
var AYESEEEM;
AYESEEEM = (function (module) {
  'use strict';

  const myQuitDate = new Date(Date.parse('2009-11-03T08:30'));
  const packsPerWeek = 9;
  // TODO: ICM 2024-10-30: Extract from `details.html`
  const pricePerPack = 18.80; // **IMPORTANT Update details.html when changed**
  const currency = AYESEEEM.currency.makeCurrency('£', 100);
  /**
   * Celebrates multiples of powers of tens.
   * For example:
   * - if >= 10, < 100 days, celebrate 10, 20, 30
   * - if < 10 days, celebrate each day
   * - if >= 100, < 1000, celebrate 100, 200, 300
   *
   * and similarly for greater powers.
   *
   * @param {type} n  the number to possibly celebrate
   * @returns {Number} n if the number is celebratable, 0 otherwise
   */
  function isCelebratableNumber(n) {
    const actualLog = Math.log10(n);
    const baseLog = Math.floor(actualLog);    // still a float
    const unitsToCountIn = Math.pow(10, baseLog); // still a float

    if (Math.floor(n) % Math.floor(unitsToCountIn) === 0) {
      return n;
    }
    return 0;
  }

  /**
   * Determines if the difference between two dates is a number of full months.
   *
   * It does this by comparing the day number. If they're the same, then it's
   * a whole number of months, for example Jan 3rd and March 3rd => 2 months diff.
   *
   * Test spec 1:
   * ```javascript
   * isMonthDiff(date(2009, 01, 13), date(2009, 03, 12)) => 0
   * isMonthDiff(date(2009, 01, 13), date(2009, 03, 13)) => 2
   * isMonthDiff(date(2009, 01, 13), date(2009, 03, 14)) => 0
   * ```
   *
   * This can go wrong when the day is > 28. If it's Jan 30, then there's no
   * day in Feb when it's a whole number of months later. But on Mar 30, it
   * IS 2 whole months. So for days > 28, this only applies sometimes.
   *
   * Test spec 2:
   * ```javascript
   * isMonthDiff(date(2009, 01, 30), date(2009, 02, 28)) => 0
   * isMonthDiff(date(2009, 01, 30), date(2009, 03, 30)) => 2
   * ```
   *
   * Doesn't matter which date is earlier:
   *
   * Test spec 3:
   * ```javascript
   * isMonthDiff(date(2009, 03, 13), date(2009, 01, 12)) => 0
   * isMonthDiff(date(2009, 03, 13), date(2009, 01, 13)) => -2
   * isMonthDiff(date(2009, 03, 13), date(2009, 01, 14)) => 0
   * ```
   *
   * Duplicate dates is no difference in months:
   *
   * Test spec 4:
   * ```javascript
   * isMonthDiff(date(2009, 03, 13), date(2009, 03, 13)) => 0
   * ```
   *
   * One month works:
   *
   * Test spec 5:
   * ```javascript
   * isMonthDiff(date(2009, 03, 13), date(2009, 04, 13)) => 1
   * ```
   *
   * @param {type} date1
   * @param {type} date2
   * @returns {Number} the number of months the difference is, or 0 when not whole
   *                   number of months
   */
  function isMonthDiff(date1, date2) {
    if (date1.getDate() === date2.getDate()) {
      const date1Months = date1.getYear() * 12 + date1.getMonth();
      const date2Months = date2.getYear() * 12 + date2.getMonth();
      const diff = date2Months - date1Months;
      return diff;
    }
    return 0;
  }

  function savingsCalculator(packsPerWeek, pricePerPack, currency) {
    function calculateSaving(elapsedWeeks) {
      const moneySavedPerWeek = pricePerPack * packsPerWeek;
      const cashUnrounded = moneySavedPerWeek * elapsedWeeks;
      const saving = currency.format(cashUnrounded);
      return saving;
    }
    return calculateSaving;
  }

  const calculateSaving = savingsCalculator(packsPerWeek, pricePerPack, currency);

  // HACK: ICM 2015-05-29: Simple hack to get whole days
  // Expects a "Date" object created from the millis diff of 2 dates
  function dateDiffAsWholeDays(dateDiff) {
    return Math.floor(dateDiffAsDays(dateDiff));
  }

  // HACK: ICM 2015-05-29: Simple hack to get days
  // Expects a "Date" object created from the millis diff of 2 dates
  function dateDiffAsDays(dateDiff) {
    return dateDiff.getTime() / (24 * 60 * 60 * 1000);
  }

  // HACK: ICM 2016-04-30: Simple hack to get weeks
  // Expects a "Date" object created from the millis diff of 2 dates
  function dateDiffAsWeeks(dateDiff) {
    return dateDiffAsDays(dateDiff) / 7.0;
  }

  function celebrate(timeToCelebrate, whenToCelebrate) {

    console.log('Let\'s celebrate ' + timeToCelebrate.toDateString() +
        ' on ' + whenToCelebrate.toDateString() + ' at ' + whenToCelebrate.toTimeString());

    const elapsed = new Date(whenToCelebrate.getTime() - timeToCelebrate.getTime());

    const summary = [];
    summary.push('It\'s been ' + elapsed);

    const elapsedDays = dateDiffAsWholeDays(elapsed);
    summary.push('It\'s been ' + elapsedDays + ' days');

    const elapsedWeeks = dateDiffAsWeeks(elapsed);
    summary.push('It\'s been ' + Math.floor(elapsedWeeks) + ' weeks, ' + (elapsedDays % 7) + ' days');

    const saving = calculateSaving(elapsedWeeks);

    const celebrations = [];
    if (isCelebratableNumber(elapsedDays)) {
      celebrations.push('It\'s been ' + elapsedDays + ' days');
    }

    if ((elapsedDays % 7) === 0) {
      celebrations.push('It\'s been ' + elapsedWeeks + ' weeks');
    }

    const isMonthAnniversary = isMonthDiff(timeToCelebrate, whenToCelebrate);
    if (isMonthAnniversary) {
      if ((isMonthAnniversary <= 6) || (isMonthAnniversary % 3 === 0)) {
        // TODO: at some point, stop celebrating every month
        // and start going up in, say, 3s.
        // TODO: when m > 12, start saying "N Years {M months}"
        celebrations.push('It\'s been ' + isMonthAnniversary + ' months');
      }
    }

    // HACK: ICM 2016-04-30: a bit of a hack to get out the info for web page. Needs cleaning up
    return { saving: saving, summary: summary, celebrations: celebrations };
  }

  // Module 'anniversary'
  module.anniversary = {
    isCelebratableNumber: isCelebratableNumber,
    isMonthDiff: isMonthDiff,
    calculateSaving: calculateSaving,
    celebrate: celebrate,
    dateDiffAsWholeDays: dateDiffAsWholeDays,
    dateDiffAsWeeks: dateDiffAsWeeks,
    myQuitDate: myQuitDate
  };

  return module;
}(AYESEEEM || {}));
