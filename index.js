const Alexa = require("alexa-sdk");
const rp = require('request-promise');
const {APP_ID,MESSAGES} = require('./app/constants');
const Intent = require('./app/intentHandlers')

const handlers = {
  "LaunchRequest": function(){
    Intent.launchRequest(this);
  },
  "TrailStatusIntent": function() {
    Intent.trailStatusIntent(this);
  },
  "OpenTrailIntent": function() {
    Intent.openTrailIntent(this);
  },
  'AMAZON.HelpIntent': function () {
    Intent.helpIntent(this);
  },
  'AMAZON.CancelIntent': function () {
    Intent.cancelIntent(this);
  },
  'AMAZON.StopIntent': function () {
    Intent.stopIntent(this);
  },
  'Unhandled': function () {
    Intent.unhandledIntent(this);
  }
}

exports.handler = function(event,context,callback){
  var alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.resources=MESSAGES;
  alexa.execute();
}
