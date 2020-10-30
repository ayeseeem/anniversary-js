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

  /**
   * Celebrates multiples of powers of tens.
   * e.g.
   * <pre>
   * if >= 10, < 100 days, celebrate 10, 20, 30
   * if < 10 days, celebrate each day
   * if >= 100, < 1000, celebrate 100, 200, 300
   * </pre>
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
   * a whole number of months, e.g. Jan 3rd and March 3rd => 2 months diff.
   *
   * Test spec 1:
   * <pre>
   * isMonthDiff(date(2009, 01, 13), date(2009, 03, 12)) => 0
   * isMonthDiff(date(2009, 01, 13), date(2009, 03, 13)) => 2
   * isMonthDiff(date(2009, 01, 13), date(2009, 03, 14)) => 0
   * </pre>
   * This can go wrong when the day is > 28. If it's Jan 30, then there's no
   * day in Feb when it's a whole number of months later. But on Mar 30, it
   * IS 2 whole months. So for days > 28, this only applies sometimes.
   *
   * Test spec 2:
   * <pre>
   * isMonthDiff(date(2009, 01, 30), date(2009, 02, 28)) => 0
   * isMonthDiff(date(2009, 01, 30), date(2009, 03, 30)) => 2
   * </pre>
   * Doesn't matter which date is earlier:
   * Test spec 3:
   * <pre>
   * isMonthDiff(date(2009, 03, 13), date(2009, 01, 12)) => 0
   * isMonthDiff(date(2009, 03, 13), date(2009, 01, 13)) => -2
   * isMonthDiff(date(2009, 03, 13), date(2009, 01, 14)) => 0
   * </pre>
   * Duplicate dates is no diffence in months:
   * Test spec 4:
   * <pre>
   * isMonthDiff(date(2009, 03, 13), date(2009, 03, 13)) => 0
   * </pre>
   * One month works:
   * Test spec 5:
   * <pre>
   * isMonthDiff(date(2009, 03, 13), date(2009, 04, 13)) => 1
   * </pre>
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

  function calculateSaving(elapsedWeeks) {
    // GBP/pack of 20 - 6.00 @ 2010-02-16
    // GBP/pack of 20 - 8.80 @ 2014-10-18
    // GBP/pack of 20 - 8.96 @ 2015-05-29
    // GBP/pack of 20 - 9.23 (based on 100s pack) @ 2015-10-30
    // GBP/pack of 20 - 9.72 (based on 100s pack) @ 2016-10-07
    // GBP/pack of 20 - 10.33 (based on 100s pack) @ 2017-11-03
    // GBP/pack of 20 - 11.33 (based on 100s pack, Tesco online) @ 2018-11-02
    // GBP/pack of 20 - 12.00 (based on 100s pack, Waitrose online) @ 2019-11-02
    const pricePerPack = 12.01; // TODO: ICM 2020-10-30: Restore to 12.00 when formatting is fixed
    const packsPerWeek = 9;
    const moneySavedPerWeek = pricePerPack * packsPerWeek;
    const cashUnrounded = moneySavedPerWeek * elapsedWeeks;
    const currency = AYESEEEM.currency.makeCurrency('£', 100);
    const saving = currency.format(cashUnrounded);
    console.log('you have saved ' + saving + ' in today\'s prices');
    return saving;
  }

  // HACK: ICM 2015-05-29: Simple hack to get whole days
  // Expects a "Date" object created from the millis diff of 2 dates
  function dateDiffAsWholeDays(dateDiff) {
    return Math.floor(dateDiffAsDays(dateDiff));
  }

  // HACK: ICM 2015-05-29: Simple hack to get  days
  // Expects a "Date" object created from the millis diff of 2 dates
  function dateDiffAsDays(dateDiff) {
    return dateDiff.getTime() / (24 * 60 * 60 * 1000);
  }

  // HACK: ICM 2016-04-30: Simple hack to get whole weeks
  // Expects a "Date" object created from the millis diff of 2 dates
  function dateDiffAsWeeks(dateDiff) {
    return dateDiffAsDays(dateDiff) / 7.0;
  }

  function celebrate(timeToCelebrate, whenToCelebrate) {

    console.log('let\'s celebrate ' + timeToCelebrate.toDateString() +
        ' on ' + whenToCelebrate.toDateString() + ' at ' + whenToCelebrate.toTimeString());

    const elapsed = new Date(whenToCelebrate.getTime() - timeToCelebrate.getTime());

    console.log('Summary:');
    console.log('it\'s been ' + elapsed);

    const elapsedDays = dateDiffAsWholeDays(elapsed);
    console.log('it\'s been ' + elapsedDays + ' days');

    const elapsedWeeks = dateDiffAsWeeks(elapsed);
    console.log('it\'s been ' + Math.floor(elapsedWeeks) + ' weeks, ' + (elapsedDays % 7) + ' days');

    const saving = calculateSaving(elapsedWeeks);

    console.log('Celebrations:');

    if (isCelebratableNumber(elapsedDays)) {
      console.log('it\'s been ' + elapsedDays + ' days');
    }

    if ((elapsedDays % 7) === 0) {
      console.log('it\'s been ' + elapsedWeeks + 'weeks');
    }

    const isMonthAnniversary = isMonthDiff(whenToCelebrate, timeToCelebrate);
    if (isMonthAnniversary) {
      if ((isMonthAnniversary <= 6) || (isMonthAnniversary % 3 === 0)) {
        // TODO: at some point, stop celebrating every month
        // and start going up in, say, 3s.
        // TODO: when m > 12, start saying "N Years {M months}"
        console.log('It\'s been ' + isMonthAnniversary + ' months');
      }
    }

    // HACK: ICM 2016-04-30: a bit of a hack to get out the info for web page. Needs cleaning up
    return saving;
  }

  const myQuitDate = new Date(Date.parse('2009-11-03T08:30'));
  celebrate(myQuitDate, new Date());

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
