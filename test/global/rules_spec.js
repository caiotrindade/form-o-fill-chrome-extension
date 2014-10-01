/*global Storage */
var Rules = require("../../src/js/global/rules.js");

describe("Rules", function() {
  describe(".match", function() {

    var stubRules = function(out) {
      sinon.stub(Rules, "all").returns(new Promise(function(resolve) {
        resolve(out);
      }));
    };

    afterEach(function () {
      Rules.all.restore();
    });

    it("returns all rules with matching url", function(){
      stubRules([{url: /test\.html/}, {url: /test2\.html/}]);
      return expect(Rules.match("test2.html")).to.become([ { url: /test2\.html/ } ]);
    });

    it("returns an empty array if no rules match", function(){
      stubRules([{url: /test\.html/}, {url: /test2\.html/}]);
      return expect(Rules.match("nomatch.html")).to.eventually.eql([]);
    });

    it("ignores rules which have no url (broken)", function(){
      stubRules([{nourl: /test\.html/}, {url: /test2\.html/}]);
      return expect(Rules.match("test.html")).to.eventually.eql([]);
    });
  });

  describe(".load", function() {

    var stub = function(rulesData) {
      sinon.stub(Storage, "load").returns(new Promise(function(resolve) {
        resolve(rulesData);
      }));
    };

    afterEach(function () {
      Storage.load.restore();
    });

    it("returns an empty array when rulesData is null", sinon.test(function(){
      stub(null);
      return expect(Rules.load(1)).to.eventually.eql([]);
    }));

    it("returns an array of Rule instances", sinon.test(function(){
      stub({
        "code": "var rules = [{ 'url': 'url', 'name': 'name' }];",
        "tabId": "1"
      });

      // These are the expected properties of a Rule instance:
      var ruleProperties = ['url', 'name', 'url', 'urlClean', 'nameClean', 'id'];

      // Make an array of expectation and return them all resolved
      return Promise.all(ruleProperties.map(function (ruleProperty) {
        return expect(Rules.load(1)).to.eventually.have.deep.property("[0]." + ruleProperty);
      }));
    }));
  });

  describe(".text2function", function() {
  });

  describe(".all", function() {
  });

  describe(".save", function() {
  });

  describe(".delete", function() {
  });

  describe(".format", function() {
  });

  describe(".syntaxCheck", function() {
  });

  describe(".checkBeforeFunction", function() {
  });

  describe(".lastMatchingRules", function() {
  });
});

