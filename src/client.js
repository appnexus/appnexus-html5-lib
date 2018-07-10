'use strict';

var Porthole = require('./lib/porthole');
var EventListener = require('./lib/event-listener');

function AppNexusHTML5Lib ()  {
  var self = this;
  this.debug = false;
  this.inFrame = false;
  this.EventListener = EventListener;

  var isClient = false;
  var readyCalled = false;
  var isPageLoaded = false;
  var expandProperties = {}
  var dispatcher = new EventListener();
  var clientPorthole;
  var adData = {};
  var clickTag = '';

  try {
    this.inFrame = (window.self !== window.top);
  } catch (e) {
    this.inFrame = true;
  }

  dispatcher.addEventListener('ready', function () {
    if (readyCalled) {
      if (self.debug) console.info('Client initialized!');
    }
  });

  /**
   * Setup porthole so we can talk to our parent and listen to messages from it
   */
  var initPorthole = function(){
    clientPorthole = new Porthole.WindowProxy();
    clientPorthole.addEventListener(handleMessages);
    clientPorthole.post({ action: 'ready'}); //notify parent we are ready
  };

  var checkReady = function (f){ /in/.test(document.readyState) ? setTimeout(function () { checkReady(f); } , 9) : f(); }
  checkReady(function (){
    isPageLoaded = true;
    if (!!Object.keys(adData).length) {
      dispatcher.dispatchEvent('ready');
    }
  });

  var openUrl = function(url){
    window.open(url, "_blank");
  };

  /**
   * Listen to messages that come from the parent window
   * @param messageEvent
   */
  var handleMessages = function(messageEvent){
    switch(messageEvent.data.action) {
      case 'setAdData':  //receive data about the ad
        adData = messageEvent.data.parameters;
        if (isPageLoaded) {
          dispatcher.dispatchEvent('ready');
        }
        break;
    }
  };

  function getParameterByName(name) {
    var match = RegExp('[?&]' + name +
      '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  this.ready = function (callback) {
    if (typeof callback === 'function') {
      dispatcher.addEventListener('ready', callback);
    }

    if (!readyCalled) {
      initPorthole();
      readyCalled = true;
      clickTag = this.getClickTag();
      self.debug = !self.inFrame;
    }
  }

  this.getClickTag = function(){
    return getParameterByName('clickTag');
  };

  this.click = function () {
    clickTag = this.getClickTag();
    if (!clickTag) console.log('No clickTag defined: click event will open a blank page');
    openUrl(clickTag);
    if (self.debug) console.info('Client send action: click');
  }

  this.setExpandProperties = function (props) {
    if (!readyCalled || !clientPorthole) throw new Error('APPNEXUS library has not been initialized. APPNEXUS.ready() must be called first');
    expandProperties = props;
    clientPorthole.post({ action: 'set-expand-properties', properties: props });
    if (self.debug) console.info('Client send action: set-expand-properties');
  }

  this.getExpandProperties = function () {
    return expandProperties;
  }

  this.expand = function () {
    if (!readyCalled || !clientPorthole) throw new Error('APPNEXUS library has not been initialized. APPNEXUS.ready() must be called first');
    clientPorthole.post({ action: 'expand' });
    if (self.debug) console.info('Client send action: expand');
  }

  this.collapse = function () {
    if (!readyCalled || !clientPorthole) throw new Error('APPNEXUS library has not been initialized. APPNEXUS.ready() must be called first');
    clientPorthole.post({ action: 'collapse' });
    if (self.debug) console.info('Client send action: collapse');
  }

  this.getMacroByName = function (macro) {
    if (!readyCalled || !clientPorthole) throw new Error('APPNEXUS library has not been initialized. APPNEXUS.ready() must be called first');
    
    if(adData && adData.macros && adData.macros[macro] !== undefined){
      return adData.macros[macro];
    }
    else {
      return undefined;
    }
  }
}

var APPNEXUS = new AppNexusHTML5Lib();
if (typeof window !== 'undefined') {
  window.APPNEXUS = APPNEXUS;
}

module.exports = APPNEXUS;