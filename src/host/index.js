'use strict';

var guid = require('../lib/guid');
var Porthole = require('../lib/porthole');

module.exports.placement = function (mediaURL, landingPageURL, creativeWidth, creativeHeight) {
  var uid = guid();
  var checkReady = function (f){ /in/.test(document.readyState) ? setTimeout(function () { checkReady(f); } , 9) : f(); }

  var deepExtend = function(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj) continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            deepExtend(out[key], obj[key]);
          else
            out[key] = obj[key];
        }
      }
    }
    return out;
  };

  var windowProxy;
  function onMessage(messageEvent) {
    switch(messageEvent.data.action) {
      case 'click':
        window.open(landingPageURL);
        break;
      case 'expand':

        break;
      case 'contract':
        break;
    }
    console.log(messageEvent.data)
    // var guestFrame = document.getElementById('guestFrame');
    // if (messageEvent.origin == mediaURL.replace(/^(https?:\/\/[^/]+).*$/, '$1')) {

    //   if (messageEvent.data) {
    //     for (var key in messageEvent.data) {
    //       guestFrame[key] = deepExtend(guestFrame[key], messageEvent.data[key]);
    //     }
    //   }
    // }
  }

  checkReady(function () {
    windowProxy = new Porthole.WindowProxy(null, 'an-' + uid);
    windowProxy.addEventListener(onMessage);
  });

  document.write('<iframe id="an-'+uid+'" name="guestFrame" src="'+mediaURL+'" width="'+creativeWidth+'" height="'+creativeHeight+'" frameborder="0" scrolling="no" allowfullscreen="true" style="width: '+creativeWidth+'px; height: '+creativeHeight+'px; position:absolute; "></iframe>');

}