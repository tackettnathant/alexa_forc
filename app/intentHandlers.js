const Alexa = require("alexa-sdk");
const rp = require('request-promise');

const {URL_QCFORC,ERROR_TRAIL_NOT_FOUND,ERROR_UNABLE_TO_RETRIEVE_DATA} = require('./constants');
const {getOpenTrailMessage,getTrailStatusMessage,extractTrailName,extractStatusData,retrieveFORCData} = require('./utils');

const launchRequest = function(handler){
  handler.response.speak(handler.t('MSG_WELCOME')).listen(handler.t('MSG_WELCOME'));
  handler.emit(':responseReady');
}

const trailStatusIntent = function(handler) {
  retrieveFORCData()
  .then((data)=>{
    try{
      let msg;
      if (data) {
        msg=getTrailStatusMessage(extractTrailName(handler.event.request.intent.slots),data,handler);
      } else {
        msg=handler.t('MSG_ERROR');
      }
      handler.response.speak(msg);
      handler.emit(':responseReady');
    } catch (e){
      handleErrors(e,handler)
    }
  })
  .catch(function(e){
    handleErrors(e,handler);
  })
}

const openTrailIntent = function(handler) {
  retrieveFORCData()
  .then((data)=>{
      try{
      let msg;
      if (data) {
        msg=getOpenTrailMessage(extractTrailName(handler.event.request.intent.slots),data,handler);
      } else {
        msg=handler.t('MSG_ERROR');
      }
      handler.response.speak(msg);
      handler.emit(':responseReady');
    } catch (e){
      handleErrors(e,handler);
    }
  })
  .catch(function(err){
    handleErrors(e,handler);
  })
}

const helpIntent=function(handler){
  handler.response.speak(handler.t('MSG_HELP')+". "+handler.t("MSG_HELP_PROMPT")).listen(handler.t('MSG_HELP_PROMPT'));
  handler.emit(':responseReady');
}

const cancelIntent=function(handler) {
  handler.response.speak(handler.t('MSG_BYE'));
  handler.emit(':responseReady');
}

const stopIntent=function(handler){
  handler.response.speak(handler.t('MSG_BYE'));
  handler.emit(':responseReady');
}

const unhandledIntent=function(handler){
  handler.response.speak(handler.t('MSG_UNHANDLED')).listen(handler.t('MSG_HELP_PROMPT'));
  handler.emit(':responseReady');
}

const handleErrors=function(e,handler){
  if (e===ERROR_TRAIL_NOT_FOUND) {
    handler.response.speak(handler.t('MSG_NO_TRAIL')+" "+handler.t('MSG_WELCOME')).listen();
    handler.emit(':responseReady');
  } else {
    handler.response.speak(handler.t('MSG_ERROR'));
    handler.emit(':responseReady');
  }
}
module.exports= {
  launchRequest,
  trailStatusIntent,
  openTrailIntent,
  helpIntent,
  cancelIntent,
  stopIntent,
  unhandledIntent
}
