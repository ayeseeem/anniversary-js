`anniversary-js`
================

TODO
----

- [ ] Extract latest price from `details/html` table.
- [x] Fix: formatting: breaks if pack price ends ".00",
  zeros are not output.
  For example, one week default saving:
  - price 12.00 -> `£108`, not `£108.00`
  - price 12.01 -> `£108.09`
  - Done: it was the test that was failing to construct expected result
    correctly, not the code
