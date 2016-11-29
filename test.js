var expect = require("chai").expect;

var server = require('./lib.js');

//thanks https://github.com/jesstelford/react-testing-mocha-jsdom
var jsdom = require('jsdom');
// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView; //thanks https://github.com/tmpvar/jsdom/issues/1381
global.navigator = {userAgent: 'node.js'}; //thanks http://stackoverflow.com/a/37084875/5203563

var $ = require("jquery");

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
$.ajaxSettings.xhr = function() {
  return new XMLHttpRequest();
};

var successResponse;
var failureResponse;

var PORT = 8084;
var URL = "http://localhost:" + PORT;

describe("cookie test page", function () {
  before(function (next) {
    server(PORT, function (message) {
      expect(message).to.include(PORT);
      next();
    });
  });

  beforeEach(function () {
    ///CLEAR COOKIES HERE ONCE WE KNOW HOW THEY WORK
  });

  describe("when you load the home page", function () {
    var successResponse;
    var failureResponse;
    beforeEach(function (next) {
      successResponse = null;
      failureResponse = null;
      $.ajax({
        type: "get",
        success: function (response) {
          successResponse = response;
          next();
        },
        error: function (a, b, c) {
          failureResponse = JSON.stringify([a, b, c]);
          next();
        },
        url: URL
      });
    });

    it("should not fail", function () {
      expect(failureResponse).not.to.be.ok;
    });

    it("should not have a cookie yet", function () {
      expect(successResponse).to.be.ok;
      expect(successResponse).to.include("cookie is empty");
    });
  });

  describe("when you set the cookie", function () {
    beforeEach(function (next) {
      successResponse = null;
      failureResponse = null;
      $.ajax({
        type: "post",
        data: "cookie=thisIsATest",
        success: function (response) {
          successResponse = response;
          next();
        },
        error: function (a, b, c) {
          failureResponse = JSON.stringify([a, b, c]);
          next();
        },
        url: URL
      });
    });

    it("should not fail", function () {
      expect(failureResponse).not.to.be.ok;
    });

    it("should succeed", function () {
      expect(successResponse).to.be.ok;
    });

    it("should understand the query style payload", function () {
      expect(successResponse).not.to.include("no cookie set");
    });

    it("should set the cookie to the value we sent", function () {
      expect(successResponse).to.include("thanks for setting cookie to thisIsATest");
    });

    describe("and then request the homepage again", function () {
      beforeEach(function (next) {
        successResponse = null;
        failureResponse = null;
        $.ajax({
          type: "get",
          success: function (response) {
            successResponse = response;
            next();
          },
          error: function (a, b, c) {
            failureResponse = JSON.stringify([a, b, c]);
            next();
          },
          url: URL
        });
      });

      it("should not fail", function () {
        expect(failureResponse).not.to.be.ok;
      });

      it("should have cookie now", function () {
        expect(successResponse).to.be.ok;
        expect(successResponse).not.to.include("cookie is empty");
      });

      it("should have the cookie we set a moment ago", function () {
        expect(successResponse).to.include("thisIsATest");
      });
    });

  });


});