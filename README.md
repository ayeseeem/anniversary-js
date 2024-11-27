`anniversary-js`
================

Help give up smoking!

Two "features" to keep you going:

- "Celebrate" something every day.
- Track how much you've saved.

You can see this working live at
<https://anniversary.firebaseapp.com/index.html>.

I originally wrote this [in Python](https://github.com/ayeseeem/anniversary-py)
as a way to help me give up smoking.

It used to try to track how much I'd saved, and I tried to make it let me
"celebrate" something most days: "It's been 10 days", "It's been two weeks",
"It's been a month", and so on, so there was always a little milestone or
achievement.

It used to be a console program, so it printed the celebration.
In porting it to Javascript, this was redirected temporarily to the browser
console, where it should still work.

The idea was always to improve this, to make it useful for others, either
for giving up smoking, or for some other thing that needs celebrating.
Never quite got round to that yet! But see the TODOs...


TODO
----

- [ ] Make the smoke part configurable so other people can enter their info -
  date, amount, cost - and use it for themselves.
  - Store their info in a "bookmark" (URL fragment), so they can return to it
    with their info stored.
- [ ] Extract the Celebration as a separate module.
  - Then display on the web page, not in the console.
- [ ] Extract latest price from `details/html` table.
