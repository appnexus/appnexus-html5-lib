'use strict';

var Porthole = require('./lib/porthole');
var EventListener = require('./lib/event-listener');
var host = require('./host');

if (!window.APPNEXUS) {

  var APPNEXUS = {
    debug: false,
    inFrame: false,
    EventListener: EventListener
  }

  var init = false;
  var expandProperties = {}
  var dispatcher = new EventListener();
  var clientPorthole;

  try {
    APPNEXUS.inFrame = (window.self !== window.top);
  } catch (e) {
    APPNEXUS.inFrame = true;
  }

  dispatcher.addEventListener('ready', function () {
    clientPorthole = new Porthole.WindowProxy();
    if (APPNEXUS.debug) console.info('Client initialized!');
  });

  var checkReady = function (f){ /in/.test(document.readyState) ? setTimeout(function () { checkReady(f); } , 9) : f(); }
  checkReady(function (){
    host.ready();
    dispatcher.dispatchEvent('ready');
  });

  APPNEXUS.ready = function (callback) {
    if (!APPNEXUS.inFrame) APPNEXUS.debug = true;
    dispatcher.addEventListener('ready', callback);
  }

  APPNEXUS.click = function () {
    clientPorthole.post({ action: 'click' });
    if (APPNEXUS.debug) console.info('Client send action: click');
  }

  APPNEXUS.setExpandProperties = function (props) {
    expandProperties = props;
    clientPorthole.post({ action: 'set-expand-properties', properties: props });
    if (APPNEXUS.debug) console.info('Client send action: set-expand-properties');
  }

  APPNEXUS.getExpandProperties = function () {
    return expandProperties;
  }

  APPNEXUS.expand = function (opts) {
    clientPorthole.post({ action: 'expand', expand: opts });
    if (APPNEXUS.debug) console.info('Client send action: expand');
  }

  APPNEXUS.collapse = function (opts) {
    clientPorthole.post({ action: 'collapse', contract: opts });
    if (APPNEXUS.debug) console.info('Client send action: collapse');
  }

  APPNEXUS.placement = host.placement(APPNEXUS);
}

if (typeof window.exports !== 'undefined') {
    window.exports.APPNEXUS = APPNEXUS || window.APPNEXUS;
} else {
    window.APPNEXUS = APPNEXUS || window.APPNEXUS;
}
