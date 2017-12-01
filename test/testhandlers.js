var expect = require('chai').expect;
var index = require('../index');

const context = require('aws-lambda-mock-context');
const ctx = context();

describe("Testing a session with the AboutIntent", function() {
    var speechResponse = null
    var speechError = null

    before(function(done){
        index.handler({
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
      "name": "OpenTrailIntent",
      "slots": {
        "trail_name": {
          "name": "trail_name",
          "value": "ILLINIWEK"
        }
      }
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
}, ctx)

        ctx.Promise
            .then(resp => { speechResponse = resp; console.log(resp);done(); })
            .catch(err => { speechError = err; done(); })
    })

    describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(speechError).to.be.null
        })

        it('should have a version', function() {
            expect(speechResponse.version).not.to.be.null
        })

        it('should have a speechlet response', function() {
            expect(speechResponse.response).not.to.be.null
        })

        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })

        it("should end the alexa session", function() {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.true
        })
    })
})
