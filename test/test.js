var rewire = require('rewire');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

var context = {
  "session": {
      "sessionId": "SessionId.154291c5-a13f-4e7a-ab5a-2342534adfeba",
      "application": {
          "applicationId": "amzn1.echo-sdk-ams.app.APP_ID"
  },
  "attributes": {},
  "user": {
      "userId": null
  },
  "new": true
  },
  "request": {
      "type": "IntentRequest",
      "requestId": "EdwRequestId.474c15c8-14d2-4a77-a4ce-154291c5",
      "timestamp": "2016-07-05T22:02:01Z",
      "intent": {
          "name": "TrailStatusIntent",
          "slots": {
            "trail_name":{
              "name":"trail_name",
              "value":"Sunderbruch"
            }
           }
      },
      "locale": "en-US"
  },
  "version": "1.0",
  "response":{
    "speak":function(msg){console.log(msg)}
  },
  "emit":function(msg){console.log(msg)}
}
var app = rewire('../index.js');

const allMatches = app.__get__('allMatches');
const handlers = app.__get__('handlers');
const getOpenTrailMessage = app.__get__('getOpenTrailMessage');
const getTrailStatusMessage = app.__get__('getTrailStatusMessage').bind(context);
const extractStatusData = app.__get__('extractStatusData');
describe('Application module', function() {

  it('should have the correct handlers', function(done) {

      done();
  });
});
