test project for stack overflow question

trying to figure out how to test cookies using $.ajax from node.


This project has a website that uses cookies and some mocha tests.

To see the website working in a browser go like this:

```bash
npm install
npm start
```
and then open http://localhost:8080

If you go to http://localhost:8080/test.html, you can see the mocha tests
running in the browser, and passing.

submit the form and it will set the cookie and then show you the value.


To try it with mocha and $.ajax, go like this:

```bash
npm install
npm test
```

The test fails because there it does not send the cookies back.

The browser version of the mocha tests are copy and pasted and modified
version of the node.js version.  To make sure they are in sync, except
for stuff that should be different, go like this:

```bash
npm run compare-tests
```

A quick look at the diff should show you that the most important stuff
is all the same.

