var expect = require('chai').expect;
var assert = require('assert');
const {getContext,getTestData} = require('./contextFactory');
const context = require('aws-lambda-mock-context');
const Constants = require('../app/constants');

describe("Testing Amazon required handlers",function(){
    describe("Testing LaunchRequest session",function(){
      var response=null;
      var error=null;
      const ctx = context();
      before(function(done){
        var index = require('../index');
        index.handler(getContext("LaunchRequest"),ctx);
        ctx.Promise
            .then(resp => { response = resp;done(); })
            .catch(err => { error = err;done(); })
      })

      describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(error).to.be.null
        })

      })

      describe("The response should contain the appropriate message", function() {
        it("should have the appropriate prompt",function(){
          expect(response.response.outputSpeech.ssml.includes(Constants.translate('MSG_WELCOME','en-US'))).to.be.true;
        })
      })
    })

    describe("Testing HelpIntent session",function(){
      var response=null;
      var error=null;
      const ctx = context();
      before(function(done){
        var index = require('../index');
        index.handler(getContext("AMAZON.HelpIntent"),ctx);
        ctx.Promise
            .then(resp => { response = resp;done(); })
            .catch(err => { error = err;done(); })
      })

      describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(error).to.be.null
        })

      })

      describe("The response should contain the appropriate message", function() {
        it("should have the appropriate prompt",function(){
          expect(response.response.outputSpeech.ssml.includes(Constants.translate('MSG_HELP','en-US'))).to.be.true;
        })
      })
    })
    describe("Testing CancelIntent session",function(){
      var response=null;
      var error=null;
      const ctx = context();
      before(function(done){
        var index = require('../index');
        index.handler(getContext("AMAZON.CancelIntent"),ctx);
        ctx.Promise
            .then(resp => { response = resp;done(); })
            .catch(err => { error = err;done(); })
      })

      describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(error).to.be.null
        })

      })

      describe("The response should contain the appropriate message", function() {
        it("should have the appropriate prompt",function(){
          expect(response.response.outputSpeech.ssml.includes(Constants.translate('MSG_BYE','en-US'))).to.be.true;
        })
      })
    })
    describe("Testing StopIntent session",function(){
      var response=null;
      var error=null;
      const ctx = context();
      before(function(done){
        var index = require('../index');
        index.handler(getContext("AMAZON.StopIntent"),ctx);
        ctx.Promise
            .then(resp => { response = resp;done(); })
            .catch(err => { error = err;done(); })
      })

      describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(error).to.be.null
        })

      })

      describe("The response should contain the appropriate message", function() {
        it("should have the appropriate prompt",function(){
          expect(response.response.outputSpeech.ssml.includes(Constants.translate('MSG_BYE','en-US'))).to.be.true;
        })
      })
    })
    describe("Testing Unhandled session",function(){
      var response=null;
      var error=null;
      const ctx = context();
      before(function(done){
        var index = require('../index');
        index.handler(getContext("Unhandled"),ctx);
        ctx.Promise
            .then(resp => { response = resp;done(); })
            .catch(err => { error = err;done(); })
      })

      describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(error).to.be.null
        })

      })

      describe("The response should contain the appropriate message", function() {
        it("should have the appropriate prompt",function(){
          expect(response.response.outputSpeech.ssml.includes(Constants.translate('MSG_UNHANDLED','en-US'))).to.be.true;
        })
      })
    })
    
})
