const Constants = require('./constants');
const rp = require('request-promise');

const retrieveFORCData=function() {
    return rp(Constants.URL_QCFORC)
          .then(function(body){
            return extractStatusData(body);
          });
}

const allMatches=function(str,re) {
  if (!str || !re) return null;
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

const extractTrailName =(slots)=> (slots && slots.trail_name && slots.trail_name.value)?slots.trail_name.value:null;

const tidyName=function(str) {
  if (!str){
    return str;
  }
  if (str.toUpperCase().indexOf(Constants.TRAIL_NAME_SUNDERBRUCH.substr(0,3))===0){
    //probably sunderbrook
    return Constants.TRAIL_NAME_SUNDERBRUCH;
  }
  return str;
}

const phonetic=function(trail_name){
  if (trail_name.toUpperCase()===Constants.TRAIL_NAME_SUNDERBRUCH){
    return Constants.PHONETIC_SUNDERBRUCH;
  }
  if (trail_name.toUpperCase()===Constants.TRAIL_NAME_ILLINIWEK){
    return Constants.PHONETIC_ILLINIWEK;
  }
  return trail_name;
}

const getOpenTrailMessage=function(check_name,data,handler){
  if (!data) {
    throw Constants.ERROR_UNABLE_TO_RETRIEVE_DATA;
  }
  if (check_name && makeKey(check_name)!=="ALL"){ //Trail specified
    let trail = data.find(function(t){
      return makeKey(t.name)===makeKey(tidyName(check_name));
    })
    if (!trail){
      throw Constants.ERROR_TRAIL_NOT_FOUND;
    }
    if (trail.status){
      if (isOpen(trail.status)){
            return handler.t('MSG_STATUS_IS',phonetic(trail.name),handler.t('MSG_OPEN'));
      } else if (trail.status.toUpperCase()===Constants.STATUS_FREEZE_THAW) {
            return handler.t('MSG_STATUS_IS',phonetic(trail.name),handler.t('MSG_FREEZE_THAW')) + handler.t('MSG_CHECK_TEMP');
      }
      return handler.t('MSG_STATUS_IS',phonetic(trail.name),handler.t('MSG_CLOSED'));
    } else {
      return handler.t('MSG_NOT_AVAILABLE',phonetic(trail.name));
    }
  } else { //All Trails
    let open = data.filter((trail)=>isOpen(trail.status))
    let freezeThaw = data.filter((trail)=>trail.status && trail.status.toUpperCase()===Constants.STATUS_FREEZE_THAW);
    if (open.length===0 && freezeThaw.length===0){
      return handler.t('MSG_ALL_CLOSED');
    }
    let msg = null;
    if (open.length>0){
        msg=open.reduce((m,trail)=>m+". "+phonetic(trail.name),handler.t('MSG_OPEN_TRAILS'))+". ";
    }
    if (freezeThaw.length>0){
        msg = msg || ""
        msg+=freezeThaw.reduce((m,trail)=>m+". "+phonetic(trail.name)
                                    ,handler.t('MSG_FREEZE_THAW_TRAILS')) +". " + handler.t('MSG_CHECK_TEMP');
    }
    return msg || handler.t('MSG_ALL_CLOSED');

  }
}

const isOpen = function(status) {
    return status && status.toUpperCase()!=Constants.STATUS_CLOSED && status.toUpperCase()!=Constants.STATUS_BRIDGE_CLOSED && status.toUpperCase()!=Constants.STATUS_FREEZE_THAW;
}

const getTrailStatusMessage=function(check_name,data,handler){
  if (check_name && makeKey(check_name)!=="ALL"){ //Trail specified
    let trail = data.find(function(t){
      return makeKey(t.name)===makeKey(tidyName(check_name));
    })
    if (!trail){
      throw Constants.ERROR_TRAIL_NOT_FOUND;
    }
    if (trail.status){
      return handler.t('MSG_STATUS_IS',phonetic(trail.name),trail.status);
    } else {
      return handler.t('MSG_NOT_AVAILABLE',phonetic(trail.name));
    }
  } else { //All Trails
    return data.reduce(
      (msg,trail)=>msg+ handler.t('MSG_STATUS_IS',phonetic(trail.name),trail.status) + ". ",
      ""
    )  }
}


const extractStatusData=function(body){
  return new Promise(function(fulfill,reject){
      let n;
        let parks=[];
        let i=0;
        do {
        let m=allMatches(body.replace(/\r?\n|\r/g,""),Constants.PARK_REGEX);
          if (m){
            parks = m.map(function(p,idx){
              return {id:idx,name:p[0],status:p[1]};
            })
          }
        } while (n)
        fulfill(parks.sort(function(a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }))
  });
}


module.exports={
  getOpenTrailMessage,
  getTrailStatusMessage,
  extractStatusData,
  extractTrailName,
  allMatches,
  tidyName,
  phonetic,
  retrieveFORCData
}
