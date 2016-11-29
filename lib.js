var fs = require('fs');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function (port, callback) {
  var app = express();

  app.use(cookieParser());

  app.use(bodyParser.urlencoded({extended: true}));

  app.get('/', function (req, res) {
    var cookiePhrase = req.cookies["test"]?"cookie is " + req.cookies["test"]:"cookie is empty";
    res.send(fs.readFileSync(__dirname + "/index.html", "utf-8").replace("{cookiePhrase}", cookiePhrase));
  });

  app.get('/test.html', function (req, res) {
    res.send(fs.readFileSync(__dirname + "/test.html", "utf-8"));
  });

  app.get('/clear-cookie.html', function (req, res) {
    res.clearCookie('test');
    res.send("cookie cleared");
  });

  app.post('/', function (req, res) {
    if (!req.body.cookie) {
      return res.send("no cookie set");
    }

    res.cookie('test', req.body.cookie);

    res.send("thanks for setting cookie to " + req.body.cookie + "<script>window.location.href = '/';</script>"); //instead of header redirect so it doesn't affect ajax
  });

  app.listen(port, function () {
    callback("listening on port " + port);
  });
};



