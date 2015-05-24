// Celebrate a passed date.

/**
 * Celebrates multiples of powers of tens.
 * e.g. if >= 10, < 100 days, celebrate 10, 20, 30
 * if < 10 days, celebrate each day
 * if >= 100, < 1000, celebrate 100, 200, 300
 * <p>
 * Test spec:
 * <pre>
 * is_celebratable_number(6) => 6
 * is_celebratable_number(7) => 7
 * is_celebratable_number(8) => 8
 *
 * is_celebratable_number(69) => 0
 * is_celebratable_number(70) => 70
 * is_celebratable_number(71) => 0
 *
 * is_celebratable_number(699) => 0
 * is_celebratable_number(700) => 700
 * is_celebratable_number(701) => 0
 * </pre>
 *
 * @param {type} n  the number to possibly celebrate
 * @returns {Number} n if the number is celebratable, 0 otherwise
 */
function is_celebratable_number(n) {
  var actual_log = Math.log10(n);
  //console.log(actual_log);

  var base_log = Math.floor(actual_log);    // still a float
  //console.log(base_log);
  var units_to_count_in = Math.pow(10, base_log); // still a float
  //console.log(units_to_count_in);

  if (Math.floor(n) % Math.floor(units_to_count_in) === 0) {
    return n;
  } else {
    return 0;
  }
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
 * @param {type} date1
 * @param {type} date2
 * @returns {Number} the number of months the difference is, or 0 when not whole
 *                   number of months
 */
function is_month_diff(date1, date2) {
  if (date1.day === date2.day) {
    var date1_months = date1.year * 12 + date1.month;
    var date2_months = date2.year * 12 + date2.month;
    var diff = date2_months - date1_months;
    return diff;
  } else {
    return 0;
  }
}

(function () {

    var time_to_celebrate = new Date(Date.parse("2009-11-03T08:30"));
    var now = new Date();

    console.log("let's celebrate " + time_to_celebrate.toDateString() + " on " + now.toDateString() + " at " + now.toTimeString());

    var elapsed = now - time_to_celebrate;

    console.log("Summary:");
    console.log("it's been " + elapsed);

    var elapsed_days = elapsed.days;
    console.log("it's been " + elapsed_days + " days");

    var elapsed_weeks = elapsed_days / 7;
    console.log("it's been " + elapsed_weeks + " weeks, " + (elapsed_days % 7) + " days");

    var currency_symbol = '£'
    var price_per_pack = 6.00;    // GBP/pack of 20  # 2010-02-16
    price_per_pack = 8.80;        // GBP/pack of 20  # 2014-10-18
    var packs_per_week = 9;
    var money_saved_per_week = price_per_pack * packs_per_week;
    var cash = money_saved_per_week * elapsed_weeks;
    console.log('cash: ' + cash);
    console.log("you have saved " + currency_symbol + cash);

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

}());
