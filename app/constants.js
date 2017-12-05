/*jslint es6 */
"use strict";
//Application constants
const APP_ID = "amzn1.ask.skill.0b012f01-205a-4937-9ea8-7c536317f66c";
const URL_QCFORC = "http://www.qcforc.org/content.php";
const PARK_REGEX = /p\sid='park'>([^<]*)<\/p>\s*<p\sid='status'>([^<]*)</gm;

//Trails and Phonetec Names
const TRAIL_NAME_ILLINIWEK = "ILLINIWEK";
const PHONETIC_ILLINIWEK = "illeyeknee wick";
const TRAIL_NAME_SUNDERBRUCH = "SUNDERBRUCH";
const PHONETIC_SUNDERBRUCH = "sunderbrook";

//Status
const STATUS_BRIDGE_CLOSED = 'BRIDGE CLOSED';
const STATUS_CLOSED = "CLOSED";
const STATUS_OPEN = "OPEN";
const STATUS_FREEZE_THAW = "FREEZE/THAW";
//Messages
const MESSAGES = {
    'en-US': {
        'translation': {
            'MSG_ERROR': "An error has occurred. Please try later ",
            'MSG_WELCOME': "What trail do you want to check? ",
            'MSG_NO_TRAIL': "Unable to locate that trail. ",
            'MSG_HELP': "This is the Q. C. Fork trail status app.",
            'MSG_HELP_PROMPT': " Say the name of a trail to check the status. Or, say what's open to find out where you can ride. ",
            'MSG_STATUS_IS': " %s status is %s",
            'MSG_OPEN': " open ",
            'MSG_CLOSED': " closed ",
            'MSG_FREEZE_THAW': " freeze thaw ",
            'MSG_NOT_AVAILABLE': " Can't find the status for %s ",
            'MSG_ALL_CLOSED': "All trails are closed. ",
            'MSG_OPEN_TRAILS': "The following trails are open ",
            'MSG_FREEZE_THAW_TRAILS': "The following trails are freeze thaw ",
            "MSG_CHECK_TEMP": "  Check the temperature before you head out ",
            'MSG_BYE': "bye!",
            'MSG_UNHANDLED': " I didn't understand your request "
        }
    }
};

//Errors
const ERROR_TRAIL_NOT_FOUND = 1;
const ERROR_UNABLE_TO_RETRIEVE_DATA = 2;

const translate = function (term, locale) {
    locale = locale || 'en-US';
    if (MESSAGES[locale] && MESSAGES[locale].translation[term]) {
        return MESSAGES[locale].translation[term];
    }
    //Check for just language
    if (locale.includes("-")) {
        let lang = locale.split("-")[0];
        if (MESSAGES[lang] && MESSAGES[lang].translation[term]) {
            return MESSAGES[lang].translation[term];
        }
    }
    return term; //no translation
};

module.exports = {
    URL_QCFORC,
    APP_ID,
    MESSAGES,
    ERROR_TRAIL_NOT_FOUND,
    ERROR_UNABLE_TO_RETRIEVE_DATA,
    translate,
    PARK_REGEX,
    STATUS_BRIDGE_CLOSED,
    STATUS_CLOSED,
    STATUS_OPEN,
    STATUS_FREEZE_THAW,
    PHONETIC_ILLINIWEK,
    PHONETIC_SUNDERBRUCH,
    TRAIL_NAME_ILLINIWEK,
    TRAIL_NAME_SUNDERBRUCH
};
