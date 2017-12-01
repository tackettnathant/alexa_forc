const Alexa = require("alexa-sdk");
const rp = require('request-promise');

const URL_QCFORC= "http://www.qcforc.org/content.php";
const APP_ID="amzn1.ask.skill.0b012f01-205a-4937-9ea8-7c536317f66c";
const MSG_ERROR="An error has occurred. Please try later";
const MSG_WELCOME="What trail do you want to check?";
const MSG_NO_TRAIL="Unable to locate that trail. ";
const MSG_HELP="This is the Q. C. Fork trail status app.";
const MSG_HELP_PROMPT=" Say the name of a trail to check the status. Or, say what's open to find out where you can ride."
const MSG_STATUS_IS=" status is ";
const MSG_OPEN=" open ";
const MSG_CLOSED=" closed ";
const MSG_NOT_AVAILABLE=" not available ";
const MSG_ALL_CLOSED="All trails are closed";
const MSG_OPEN_TRAILS="The following trails are open ";
const TRAIL_NOT_FOUND=1;
const UNABLE_TO_RETRIEVE_DATA=2;
const MSG_BYE="bye!";
const handlers = {
  "LaunchRequest": function(){
    this.response.speak(MSG_WELCOME).listen(MSG_WELCOME);
    this.emit(':responseReady');
  },
  "TrailStatusIntent": function() {
    rp(URL_QCFORC)
    .then((body)=>{
    try{
      let msg;
      let data = extractStatusData(body);
      if (data) {
        msg=getTrailStatusMessage(extractTrailName(this.event.request.intent),data);
      } else {
        msg=MSG_ERROR;
      }
      this.response.speak(msg);
      this.emit(':responseReady');
    } catch (e){
        if (e===TRAIL_NOT_FOUND) {
          this.response.speak(MSG_NO_TRAIL+" "+MSG_WELCOME).listen();
          this.emit(':responseReady');
        } else {
          this.response.speak(MSG_ERROR);
          this.emit(':responseReady');
        }
    }
    })
    .catch(function(err){
      this.response.speak(MSG_ERROR);
      this.emit(':responseReady');
    })
  },
  "OpenTrailIntent": function() {

    rp(URL_QCFORC)
    .then((body)=>{
      try{
      let msg;
      let data = extractStatusData(body);
      if (data) {
        msg=getOpenTrailMessage(extractTrailName(this.event.request.intent),data);
      } else {
        msg=MSG_ERROR;
      }
      this.response.speak(msg);
      this.emit(':responseReady');
    } catch (e){
        if (e===TRAIL_NOT_FOUND) {
          this.response.speak(MSG_NO_TRAIL+" "+MSG_WELCOME).listen();
          this.emit(':responseReady');
        } else {
          this.response.speak(MSG_ERROR);
          this.emit(':responseReady');
        }
    }
    })
    .catch(function(err){
      this.response.speak(MSG_ERROR);
      this.emit(':responseReady');
    })
  },
    'AMAZON.HelpIntent': function () {
        this.response.speak(MSG_HELP).listen(MSG_HELP_PROMPT);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(MSG_BYE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(MSG_BYE);
        this.emit(':responseReady');
    }
}

const extractTrailName =(intent)=> (intent.slots && intent.slots.trail_name && intent.slots.trail_name.value)?intent.slots.trail_name.value:null;
const tidyName=function(str) {
  if (!str){
    return str;
  }
  if (str.toUpperCase().indexOf("SUN")===0){
    //probably sunderbrook
    return "Sunderbruch";
  }
  return str;
}

const phonetic=function(trail_name){
  if (trail_name.toUpperCase()==="SUNDERBRUCH"){
    return "sunderbrook";
  }
  if (trail_name.toUpperCase()==="ILLINIWEK"){
    return "illeyeknee wick";
  }
  return trail_name;
}

const getOpenTrailMessage=function(check_name,data){
  if (check_name && makeKey(check_name)!=="ALL"){ //Trail specified
    let trail = data.find(function(t){
      return makeKey(t.name)===makeKey(tidyName(check_name));
    })
    if (!trail){
      throw TRAIL_NOT_FOUND;
    }
    if (trail.status){
      if (trail.status.toUpperCase()!="CLOSED"&&trail.status.toUpperCase()!="BRIDGE CLOSED"){
        return check_name + MSG_STATUS_IS+MSG_OPEN;
      }
      return check_name + MSG_STATUS_IS+MSG_CLOSED;
    } else {
      return check_name + MSG_NOT_AVAILABLE;
    }
  } else { //All Trails
    if (!data && data.length==0){
      return MSG_ALL_CLOSED;
    } else {
      return data.reduce(
        (msg,trail)=>msg+". "+phonetic(trail.name),
        MSG_OPEN_TRAILS
      )
    }
  }
}

const getTrailStatusMessage=function(check_name,data){
  if (check_name && makeKey(check_name)!=="ALL"){ //Trail specified
    let trail = data.find(function(t){
      return makeKey(t.name)===makeKey(tidyName(check_name));
    })
    if (!trail){
      throw TRAIL_NOT_FOUND;
    }
    if (trail.status){
      return check_name + MSG_STATUS_IS+trail.status;
    } else {
      return check_name + MSG_NOT_AVAILABLE;
    }
  } else { //All Trails
    return data.reduce(
      (msg,trail)=>msg+phonetic(trail.name)+MSG_STATUS_IS + trail.status + ". ",
      ""
    )  }
}


const extractStatusData=function(body){
	let n;
	let parks=[];
	let i=0;
	const parkRE=/p id='park'>([^<]*)<\/p><p id='status'>([^<]*)</g;
	do {
	  let m=allMatches(body,parkRE);
	  if (m){
		parks = m.map(function(p,idx){
		  return {id:idx,name:p[0],status:p[1]};
		})
	  }
	} while (n)
	return parks.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

const allMatches=function(str,re) {
  let m = [];
  let n;
  let i=0;
  do {
    n=re.exec(str);
    if (n){
      m[i++]=n.slice(1);
    }
  } while (n)
  return m;
}

const makeKey=(str)=>str?str.split(" ")[0].toUpperCase():null;

exports.handler = function(event,context,callback){
    // Set up the Alexa object
  var alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  // Register Handlers
  alexa.registerHandlers(handlers);

  // Start our Alexa code
  alexa.execute();
}
