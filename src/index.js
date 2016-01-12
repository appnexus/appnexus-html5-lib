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
      dispatcher.addEventListener('ready', callback);

      if (isPageLoaded) {
        dispatcher.dispatchEvent('ready');
      }
    }
  }

  this.click = function () {
    clientPorthole.post({ action: 'click' });
    if (self.debug) console.info('Client send action: click');
  }

  this.setExpandProperties = function (props) {
    expandProperties = props;
    clientPorthole.post({ action: 'set-expand-properties', properties: props });
    if (self.debug) console.info('Client send action: set-expand-properties');
  }

  this.getExpandProperties = function () {
    return expandProperties;
  }

  this.expand = function () {
    clientPorthole.post({ action: 'expand' });
    if (self.debug) console.info('Client send action: expand');
  }

  this.collapse = function () {
    clientPorthole.post({ action: 'collapse' });
    if (self.debug) console.info('Client send action: collapse');
  }

  this.placement = host.placement(this);
}

if (typeof window.exports !== 'undefined') {
  window.exports.APPNEXUS = window.APPNEXUS || new AppNexusHTML5Lib();
} else {
  window.APPNEXUS = window.APPNEXUS || new AppNexusHTML5Lib();
}
