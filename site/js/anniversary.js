// Celebrate a passed date.

/*jslint indent : 2 */

/*global $ */
// 2-liner to stop JSLint complaining "'AYESEEEM' used out of scope" at the end
var AYESEEEM;
AYESEEEM = (function (module) {
  "use strict";

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
  function is_celebratable_number(n) {
    var actual_log = Math.log10(n),
      base_log = Math.floor(actual_log),    // still a float
      units_to_count_in = Math.pow(10, base_log); // still a float

    if (Math.floor(n) % Math.floor(units_to_count_in) === 0) {
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
   * is_month_diff(date(2009, 01, 13), date(2009, 03, 12)) => 0
   * is_month_diff(date(2009, 01, 13), date(2009, 03, 13)) => 2
   * is_month_diff(date(2009, 01, 13), date(2009, 03, 14)) => 0
   * </pre>
   * This can go wrong when the day is > 28. If it's Jan 30, then there's no
   * day in Feb when it's a whole number of months later. But on Mar 30, it
   * IS 2 whole months. So for days > 28, this only applies sometimes.
   *
   * Test spec 2:
   * <pre>
   * is_month_diff(date(2009, 01, 30), date(2009, 02, 28)) => 0
   * is_month_diff(date(2009, 01, 30), date(2009, 03, 30)) => 2
   * </pre>
   * Doesn't matter which date is earlier:
   * Test spec 3:
   * <pre>
   * is_month_diff(date(2009, 03, 13), date(2009, 01, 12)) => 0
   * is_month_diff(date(2009, 03, 13), date(2009, 01, 13)) => -2
   * is_month_diff(date(2009, 03, 13), date(2009, 01, 14)) => 0
   * </pre>
   * Duplicate dates is no diffence in months:
   * Test spec 4:
   * <pre>
   * is_month_diff(date(2009, 03, 13), date(2009, 03, 13)) => 0
   * </pre>
   * One month works:
   * Test spec 5:
   * <pre>
   * is_month_diff(date(2009, 03, 13), date(2009, 04, 13)) => 1
   * </pre>
   *
   * @param {type} date1
   * @param {type} date2
   * @returns {Number} the number of months the difference is, or 0 when not whole
   *                   number of months
   */
  function is_month_diff(date1, date2) {
    if (date1.getDate() === date2.getDate()) {
      var date1_months = date1.getYear() * 12 + date1.getMonth(),
        date2_months = date2.getYear() * 12 + date2.getMonth(),
        diff = date2_months - date1_months;
      return diff;
    }
    return 0;
  }

  function calculateSaving(elapsedWeeks) {
    var currencySymbol = '£',
      subdivisionOfCurrency = 100;

    var pricePerPack = 6.00;    // GBP/pack of 20  # 2010-02-16
    pricePerPack = 8.80;        // GBP/pack of 20  # 2014-10-18
    pricePerPack = 8.96;        // GBP/pack of 20 (based on 200s pack) # 2015-05-29
    var packsPerWeek = 9;
    var moneySavedPerWeek = pricePerPack * packsPerWeek;
    var cash = moneySavedPerWeek * elapsedWeeks;
    cash = Math.round(cash * subdivisionOfCurrency) / subdivisionOfCurrency;
    console.log('cash: ' + cash);
    var saving = currencySymbol + cash;
    console.log("you have saved " + saving);
    return saving;
  }

  var time_to_celebrate = new Date(Date.parse("2009-11-03T08:30")),
    now = new Date();

  console.log("let's celebrate " + time_to_celebrate.toDateString() + " on " + now.toDateString() + " at " + now.toTimeString());

  var elapsed = new Date(now.getTime() - time_to_celebrate.getTime());

  console.log("Summary:");
  console.log("it's been " + elapsed);

  // HACK: ICM 2015-05-29: Simple hack to get days
  // Expects a "Date" object created from the millis diff of 2 dates
  function dateDiffAsDays(dateDiff) {
    return Math.floor(dateDiff.getTime() / (24 * 60 * 60 * 1000));
  }
  // HACK: ICM 2015-05-29: Convert from Python with a hack for days
  //var elapsed_days = elapsed.days;
  var elapsed_days = dateDiffAsDays(elapsed);
  console.log("it's been " + elapsed_days + " days");

  var elapsed_weeks = elapsed_days / 7;
  console.log("it's been " + Math.floor(elapsed_weeks) + " weeks, " + (elapsed_days % 7) + " days");

  calculateSaving(elapsed_weeks);

  console.log("Celebrations:");

  if (is_celebratable_number(elapsed_days)) {
    console.log("it's been " + elapsed_days + " days");
  }

  if ((elapsed_days % 7) === 0) {
    console.log("it's been " + elapsed_weeks + "weeks");
  }

  var is_month_anniversary = is_month_diff(now, time_to_celebrate);
  if (is_month_anniversary) {
    if ((is_month_anniversary <= 6) || (is_month_anniversary % 3 === 0)) {
      // TODO: at some point, stop celebrating every month
      // and start going up in, say, 3s.
      // TODO: when m > 12, start saying "N Years {M months}"
      console.log("It's been " + is_month_anniversary + " months");
    }
  }

  // Module 'anniversary'
  module.anniversary = {
    is_celebratable_number: is_celebratable_number,
    is_month_diff: is_month_diff,
    calculateSaving: calculateSaving
  };

  return module;
}(AYESEEEM || {}));
