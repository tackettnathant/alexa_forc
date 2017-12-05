/*jslint es6 */
"use strict";
var expect = require('chai').expect;
var assert = require('assert');
const {getContext, getTestData, trail, slot} = require('./contextFactory');
const context = require('aws-lambda-mock-context');
const Constants = require('../app/constants');
const mockery = require('mockery');
const bluebird = require('bluebird');
const Utils = require('../app/Utils');

function enableMockeryWithString(str) {
    disableMockery();
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
    });
    mockery.registerMock('request-promise', function () {
        return bluebird.resolve(str);
    });
}

function disableMockery() {
  mockery.disable();
  mockery.deregisterAll();
}

describe("Testing TrailStatusIntent",function(){
    describe("Intent handles a valid trail name",function(){
        let response=null;
        let error=null;
        const ctx = context();
        before(function(done){
          enableMockeryWithString(
              getTestData([
                  trail('Sunderbruch','Open'),
                  trail('Illiniwek','Closed')
              ])
          );

          var index = require('../index');
          index.handler(getContext("TrailStatusIntent",slot("trail_name","Sunderbruch")),ctx);
          ctx.Promise
              .then((resp) => { response = resp;done(); })
              .catch((err) => { error = err;done(); })
        })

        after(function(done) {
          disableMockery();
          done();
        })
        describe("The response is structurally correct for Alexa Speech Services", function() {
            it('should not have errored',function() {
                expect(error).to.be.null
            })
            it('should have a speechlet response', function() {
                expect(response.response).not.to.be.null
            })

            it("should have a spoken response", () => {
                expect(response.response.outputSpeech).not.to.be.null
            })

            it("should end the alexa session", function() {
                expect(response.response.shouldEndSession).not.to.be.null
                expect(response.response.shouldEndSession).not.to.be.false
            })
        })

        describe("The response is correct",function(){
          it("should have the appropriate prompt",function(){
            let speak=response.response.outputSpeech.ssml.toUpperCase().replace(/\s/g,"").replace("<SPEAK>","").replace("</SPEAK>","");
            assert.equal(Utils.phonetic("Sunderbruch").toUpperCase()+"STATUSISOPEN",speak);
          })
        })

    })

    describe("Intent handles Sunderbruch alias",function(){
        let response=null;
        let error=null;
        const ctx = context();
        before(function(done){
          enableMockeryWithString(
              getTestData([
                  trail('Sunderbruch','Closed')
              ])
          );

          var index = require('../index');
          index.handler(getContext("TrailStatusIntent",slot("trail_name","Sunderbrook")),ctx);
          ctx.Promise
              .then((resp) => { response = resp;done(); })
              .catch((err) => { error = err;done(); })
        })

        after(function(done) {
          disableMockery();
          done();
        })
        describe("The response is structurally correct for Alexa Speech Services", function() {
            it('should not have errored',function() {
                expect(error).to.be.null
            })
            it('should have a speechlet response', function() {
                expect(response.response).not.to.be.null
            })

            it("should have a spoken response", () => {
                expect(response.response.outputSpeech).not.to.be.null
            })

            it("should not the alexa session", function() {
                expect(response.response.shouldEndSession).not.to.be.null
                expect(response.response.shouldEndSession).not.to.be.false
            })
        })

        describe("The response is correct",function(){
          it("should have the appropriate prompt",function(){
              let speak=response.response.outputSpeech.ssml.toUpperCase().replace(/\s/g,"").replace("<SPEAK>","").replace("</SPEAK>","");
              assert.equal(Utils.phonetic("Sunderbruch").toUpperCase()+"STATUSISCLOSED",speak);
          })
        })

    })

    describe("Intent handles missing trail name",function(){
        let response=null;
        let error=null;
        const ctx = context();
        before(function(done){
          enableMockeryWithString(
              getTestData([
                  trail('Sunderbruch','Closed'),
                  trail('Illiniwek','Open')
              ])
          );

          var index = require('../index');
          index.handler(getContext("TrailStatusIntent",null),ctx);
          ctx.Promise
              .then((resp) => { response = resp;done(); })
              .catch((err) => { error = err;done(); })
        })

        after(function(done) {
          disableMockery();
          done();
        })
        describe("The response is structurally correct for Alexa Speech Services", function() {
            it('should not have errored',function() {
                expect(error).to.be.null
            })
            it('should have a speechlet response', function() {
                expect(response.response).not.to.be.null
            })

            it("should have a spoken response", () => {
                expect(response.response.outputSpeech).not.to.be.null
            })

            it("should end the alexa session", function() {
                expect(response.response.shouldEndSession).not.to.be.null
                expect(response.response.shouldEndSession).not.to.be.false
            })
        })

        describe("The response is correct",function(){
          it("should have the appropriate prompt",function(){
              let speak=response.response.outputSpeech.ssml.toUpperCase().replace(/\s/g,"").replace("<SPEAK>","").replace("</SPEAK>","");
              expect(speak.includes(Utils.phonetic("Sunderbruch").toUpperCase()+"STATUSISCLOSED")).to.be.true;
              expect(speak.includes(Utils.phonetic("Illiniwek").toUpperCase().replace(/\s/g,"")+"STATUSISOPEN")).to.be.true;
          })
        })

    })

    describe("Intent handles unknown trail",function(){
        let response=null;
        let error=null;
        const ctx = context();
        before(function(done){
          enableMockeryWithString(
              getTestData([
                  trail('Sunderbruch','Closed')
              ])
          );

          var index = require('../index');
          index.handler(getContext("TrailStatusIntent",slot("trail_name","doesnotexist")),ctx);
          ctx.Promise
              .then((resp) => { response = resp;done(); })
              .catch((err) => { error = err;done(); })
        })

        after(function(done) {
          disableMockery();
          done();
        })
        describe("The response is structurally correct for Alexa Speech Services", function() {
            it('should not have errored',function() {
                expect(error).to.be.null
            })
            it('should have a speechlet response', function() {
                expect(response.response).not.to.be.null
            })

            it("should have a spoken response", () => {
                expect(response.response.outputSpeech).not.to.be.null
            })

            it("should not end the alexa session", function() {
                expect(response.response.shouldEndSession).not.to.be.null
                expect(response.response.shouldEndSession).not.to.be.true
            })
        })

        describe("The response is correct",function(){
          it("should have the appropriate prompt",function(){
              expect(response.response.outputSpeech.ssml.includes(Constants.translate('MSG_NO_TRAIL','en-US'))).to.be.true;
          })
        })

    })

})
