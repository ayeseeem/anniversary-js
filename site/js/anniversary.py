# Celebrate a passed date.

from datetime import datetime, date, time

from math import floor, log10, pow

def is_celebratable_number(n):
    """Celebrates multiples of powers of tens.
    
    e.g. if >= 10, < 100 days, celebrate 10, 20, 30
    if < 10 days, celebrate each day
    if >= 100, < 1000, celebrate 100, 200, 300

    >>> is_celebratable_number(6)
    6
    >>> is_celebratable_number(7)
    7
    >>> is_celebratable_number(8)
    8

    >>> is_celebratable_number(69)
    0
    >>> is_celebratable_number(70)
    70
    >>> is_celebratable_number(71)
    0

    >>> is_celebratable_number(699)
    0
    >>> is_celebratable_number(700)
    700
    >>> is_celebratable_number(701)
    0
    
    """

    actual_log = log10(n)
    #print actual_log

    base_log = floor(actual_log)    # still a float
    #print base_log
    units_to_count_in = pow(10, base_log) # still a float
    #print units_to_count_in

    if (int(n) % int(units_to_count_in) == 0):
        return n
    else:
        return 0


def is_month_diff(date1, date2):
    """Determines if the difference between two dates is a number of full months.

    It does this by comparing the day number. If they're the same, then it's
    a whole number of months, e.g. Jan 3rd and March 3rd => 2 months diff.

    Returns the number of months the difference is, or 0 when not whole
    number of months.

    >>> is_month_diff(date(2009, 01, 13), date(2009, 03, 12))
    0
    >>> is_month_diff(date(2009, 01, 13), date(2009, 03, 13))
    2
    >>> is_month_diff(date(2009, 01, 13), date(2009, 03, 14))
    0

    This can go wrong when the day is > 28. If it's Jan 30, then there's no
    day in Feb when it's a whole number of months later. But on Mar 30, it
    IS 2 whole months. So for days > 28, this only applies sometimes.
    >>> is_month_diff(date(2009, 01, 30), date(2009, 02, 28))
    0
    >>> is_month_diff(date(2009, 01, 30), date(2009, 03, 30))
    2

    Doesn't matter which date is earlier:
    >>> is_month_diff(date(2009, 03, 13), date(2009, 01, 12))
    0
    >>> is_month_diff(date(2009, 03, 13), date(2009, 01, 13))
    -2
    >>> is_month_diff(date(2009, 03, 13), date(2009, 01, 14))
    0

    Duplicate dates is no diffence in months:
    >>> is_month_diff(date(2009, 03, 13), date(2009, 03, 13))
    0
    
    One month works:
    >>> is_month_diff(date(2009, 03, 13), date(2009, 04, 13))
    1
    
    
    """
    if (date1.day == date2.day):
        date1_months = date1.year * 12 + date1.month
        date2_months = date2.year * 12 + date2.month
        diff = date2_months - date1_months
        return diff
    else:
        return 0


import doctest
doctest.testmod()   # automatically validate the embedded tests


if __name__ == "__main__":
    import sys
    # e.g. use sys.argv[1]

    time_to_celebrate = datetime.combine(date(2009, 11, 03), time(8, 30))
    now = datetime.today()

    print "let's celebrate", time_to_celebrate, "on" , now.date(), "at", now.time()

    elapsed = now - time_to_celebrate

    print "Summary:"
    print "it's been", elapsed

    elapsed_days = elapsed.days
    print "it's been", elapsed_days, "days"

    elapsed_weeks = elapsed_days / 7
    print "it's been", elapsed_weeks, "weeks,", elapsed_days % 7, "days"

    import locale
    locale.setlocale(locale.LC_ALL, '')

    price_per_pack = 6.00   # GBP/pack of 20  # 2010-02-16
    price_per_pack = 8.80   # GBP/pack of 20  # 2014-10-18
    packs_per_week = 9
    money_saved_per_week = price_per_pack * packs_per_week
    cash = locale.currency(money_saved_per_week * elapsed_weeks, 1, 1, 1)
    print "you have saved", cash


    print "Celebrations:"

    if (is_celebratable_number(elapsed_days)):
        print "it's been", elapsed_days, "days"

    if ((elapsed_days % 7) == 0):
        print "it's been", elapsed_weeks, "weeks"

    is_month_anniversary = is_month_diff(now.date(), time_to_celebrate.date())
    if is_month_anniversary:
        if (is_month_anniversary <= 6) or (is_month_anniversary % 3 == 0):
            # TODO: at some point, stop celebrating every month
            # and start going up in, say, 3s.
            # TODO: when m > 12, start saying "N Years {M months}"
            print "It's been", is_month_anniversary, "months"



#    print is_celebratable_number.__doc__
#    print is_month_diff.__doc__
