const getContext=function(intent,slots){
  return {
            "session": {
            "new": true,
            "sessionId": "SessionId.1b913cc4-7467-4949-b7c5-c98064c41128",
            "application": {
            "applicationId": "amzn1.ask.skill.0b012f01-205a-4937-9ea8-7c536317f66c"
            },
            "attributes": {},
            "user": {
            "userId": null
            }
            },
            "request": {
            "type": "IntentRequest",
            "requestId": "EdwRequestId.08f780eb-94dc-48d5-bf21-2aee3fa92728",
            "intent": {
            "name": intent?intent:null,
            "slots": slots?slots:null
            },
            "locale": "en-US",
            "timestamp": "2017-11-30T03:54:17Z"
            },
            "context": {
            "AudioPlayer": {
            "playerActivity": "IDLE"
            },
            "System": {
            "application": {
              "applicationId": "amzn1.ask.skill.0b012f01-205a-4937-9ea8-7c536317f66c"
            },
            "user": {
              "userId": "amzn1.ask.account.AEQ5E2SMUN6RJCXGBQZ4AJ6NNFUH4BPPCW5YGWYSQFL2RPALKUCEG6P7XWMDPBYPZY3DIUFSNHFG3PTWJZQ37Q6CMHSRJRRQ4SCTA3XBB6TSZZEGWHFUJQFEAZSXSGKXIG4C3UMXLISOLVKT2IGASDGGDXY5T7VUFNPVFEGUDY4HX74RLS5EJRMGQJJFJZ3YAJ3HINBKHW3E33Y"
            },
            "device": {
              "supportedInterfaces": {}
            }
            }
            },
            "version": "1.0"
            }
}

const getTestData = function(trails){
    let data = null;
    if (trails){
        data=trails.reduce(function(html,trail) {
            return html + `<div id='trailblock' class='cls'>
                            <p id='park'>${trail.name || " "}</p>
                            <p id='status'>${trail.status || " "}</p>
                            <div id='popup'>
                                <div id='popup_title'>${trail.name || " "}</div>
                                <div id='popup_message'>${trail.message || " "}</div>
                                <div id='popup_date'>Updated: ${trail.updatedOn || " "}</div>
                            </div>
                        </div>`
        },
        "");
    }
    return data;
}

const trail = function(name, status, message, updatedOn) {
    return {
        "name": name,
        "status": status,
        "message": message,
        "updatedOn": updatedOn
    };
}

const slot = function(slotName,value) {
    var slot = {};
    if (slotName){
        slot[slotName]={};
        slot[slotName].name=slotName;
        slot[slotName].value=value;
    }
    return slot;

}
module.exports = {
  getContext,
  getTestData,
  trail,
  slot
}
