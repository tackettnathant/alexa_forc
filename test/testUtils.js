/*jslint es6 */
"use strict";
var expect = require('chai').expect;
var assert = require('assert');
const Utils = require('../app/utils');
const rewire = require('rewire');
const Constants = require('../app/constants');
var app = rewire('../app/utils.js');

describe("Testing retrieve FORC Data",function(){
    it("Should retrieve an array of data",function(){
        Utils.retrieveFORCData().then(function(d) {
            expect(d).not.to.be.null;
            expect(d).to.be.an('array');
        });
    });
});

describe("Testing make key",function(){

  it("should handle multiple words",function(){
    assert.equal("TEST",app.__get__('makeKey')("teST the function"));
  })
  it("should handle single word",function(){
    assert.equal("TEST",app.__get__('makeKey')("teST"));
  })
  it("should handle null",function(){
    assert.equal(null,app.__get__('makeKey')(null));
  })
  it("should handle undefined",function(){
    assert.equal(null,app.__get__('makeKey')());
  })
  it("should handle empty string",function(){
    assert.equal(null,app.__get__('makeKey')(""));
  })
})

describe("Testing extractTrailName",function(){
  it("should extract name from a slot",function(){
    assert.equal("theTrail",Utils.extractTrailName({trail_name:{name:"trail_name",value:"theTrail"}}))
  })
  it("should handle missing value attribute",function(){
    assert.equal(null,Utils.extractTrailName({trail_name:{name:"trail_name"}}))
  })
  it("should handle nulls",function(){
    assert.equal(null,Utils.extractTrailName(null))
  })
  it("should handle empty slots",function(){
    assert.equal(null,Utils.extractTrailName({}))
  })
})

describe("Testing tidyName",function(){
  it ("should tidy sunderbrook",function(){
    assert.equal(Constants.TRAIL_NAME_SUNDERBRUCH,Utils.tidyName("sunderbrook"))
  })
  it ("should tidy sunderbruch",function(){
    assert.equal(Constants.TRAIL_NAME_SUNDERBRUCH,Utils.tidyName("sunderbruch"))
  })
  it ("should tidy sundy",function(){
    assert.equal(Constants.TRAIL_NAME_SUNDERBRUCH,Utils.tidyName("sundy"))
  })
  it ("should handle mixed case",function(){
    assert.equal(Constants.TRAIL_NAME_SUNDERBRUCH,Utils.tidyName("SuNDy"))
  })
  it ("should handle nulls",function(){
    assert.equal(null,Utils.tidyName(null))
  })
  it ("should handle undefine",function(){
    assert.equal(null,Utils.tidyName())
  })
  it ("should pass non-matching values through",function(){
    assert.equal("Not Sunderbruch",Utils.tidyName("Not Sunderbruch"))
  })
})

describe("Testing phonetic",function(){
  it ("should change sunderbrook",function(){
    assert.equal(Constants.PHONETIC_SUNDERBRUCH,Utils.phonetic("sUndERbruch"));
  })
  it ("should change illiniwek ",function() {
      assert.equal(Constants.PHONETIC_ILLINIWEK,Utils.phonetic("Illiniwek"));
  })
})
//phonetic
//getOpenTrailMessage
//getTrailStatusMessage
