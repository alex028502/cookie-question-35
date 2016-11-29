test project for stack overflow question

trying to figure out how to test cookies using $.ajax from node.


This project has a website that uses cookies and some mocha tests.

To see the website working in a browser go like this:

```bash
npm install
npm start
```
and then open http://localhost:8080

submit the form and it will set the cookie and then show you the value.


To try it with mocha and $.ajax, go like this:

```bash
npm install
npm test
```

The test fails because there it does not send the cookies back.
