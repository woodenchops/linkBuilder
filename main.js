import View from './DeeplinkUI.js';
import './helper_functions/loop.js';
/*
DeepLinkModel => builds the link - getters and setters
DeeplinkUI => builds the link via a form 
*/
var formUI = new View({
    parent: 'paramContainer', 
    locale: 'locale', 
    env: 'environment', 
    brand: 'brand', 
    searchBook: 'searchBook', 
    result: 'result', 
    copyBtn: 'copyText', 
    copyNotification: 'copy-notification', 
    ohwCTA: 'ohw-generator', 
    standardLinkCTA: 'standard-generator',
    testLinkCTA: 'testLink',
    clearInput: 'clearInput'
});


console.log(formUI);