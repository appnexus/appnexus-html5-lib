'use strict';

var Porthole = require('./lib/porthole');
var EventListener = require('./lib/event-listener');
var host = require('./host');


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

  try {
    this.inFrame = (window.self !== window.top);
  } catch (e) {
    this.inFrame = true;
  }

  dispatcher.addEventListener('ready', function () {
    if (readyCalled) {
      clientPorthole = new Porthole.WindowProxy();
      if (self.debug) console.info('Client initialized!');
    }
  });

  var checkReady = function (f){ /in/.test(document.readyState) ? setTimeout(function () { checkReady(f); } , 9) : f(); }
  checkReady(function (){
    isPageLoaded = true;
    dispatcher.dispatchEvent('ready');
  });

  this.ready = function (callback) {
    if (!readyCalled) {
      readyCalled = true;
      self.debug = !self.inFrame;
      if (typeof callback === 'function') {
        dispatcher.addEventListener('ready', callback);
      }

      if (isPageLoaded) {
        dispatcher.dispatchEvent('ready');
      }
    }
  }

  this.click = function () {
    if (!readyCalled || !clientPorthole) throw new Error('APPNEXUS library has not been initialized. APPNEXUS.ready() must be called first');
    clientPorthole.post({ action: 'click' });
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

  this.placement = host.placement(this);
}


var APPNEXUS = new AppNexusHTML5Lib();
if (typeof window !== 'undefined') {
  window.APPNEXUS = APPNEXUS;
}

module.exports = APPNEXUS;