'use strict';

var Porthole = require('./lib/porthole');
var host = require('./host');

var APPNEXUS = {
  debug: true
}

var init = false;
var clientPorthole;

function initializeClient() {
  clientPorthole = new Porthole.WindowProxy();
}

APPNEXUS.ready = function (callback, t) {
  var checkReady = function (f){ /in/.test(document.readyState) ? setTimeout(function () { checkReady(f); } , 9) : f(); }
  checkReady(function (){
    if (!init) {
      initializeClient();
      init = true;
    }
    callback();
  });
}

APPNEXUS.click = function () {
  clientPorthole.post({ action: 'click' });
}

APPNEXUS.expand = function (opts) {
  clientPorthole.post({ action: 'expand', expand: opts });
}

APPNEXUS.contract = function (opts) {
  clientPorthole.post({ action: 'contract', contract: opts });
}

APPNEXUS.placement = host.placement(APPNEXUS)

if (typeof window.exports !== 'undefined') {
    window.exports.APPNEXUS = APPNEXUS;
} else {
    window.APPNEXUS = APPNEXUS;
}
