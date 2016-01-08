'use strict';

var guid = require('../lib/guid');
var utils = require('../lib/utils');
var Porthole = require('../lib/porthole');

module.exports.placement = function (APPNEXUS) {
  return function (mediaURL, landingPageURL, creativeWidth, creativeHeight) {
    var uid = guid();

    var windowProxy;
    function onMessage(messageEvent) {
      switch(messageEvent.data.action) {
        case 'click':
          window.open(landingPageURL);
          break;
        case 'expand':
          var expand = messageEvent.data.expand;
          var frame = document.getElementById('an-' + uid);
          if (expand.easing || expand.duration) {
            var cssTransition = utils.sprintf('width, height, %sms %s', parseInt(expand.duration || 0, 10), expand.easing);
            frame.style['-webkit-transition'] = cssTransition;
            frame.style['-moz-transition'] = cssTransition;
            frame.style['-ms-transition'] = cssTransition;
            frame.style['transition'] = cssTransition;
          }
          if (!isNaN(expand.height)) {
            frame.style.height = expand.height + 'px';
          }
          if (!isNaN(expand.width)) {
            frame.style.width = expand.width + 'px';
          }
          break;
        case 'contract':
          var contract = messageEvent.data.contract;
          var frame = document.getElementById('an-' + uid);
          if (contract.easing || contract.duration) {
            var cssTransition = utils.sprintf('width, height, %sms %s', parseInt(contract.duration || 0, 10), contract.easing);
            frame.style['-webkit-transition'] = cssTransition;
            frame.style['-moz-transition'] = cssTransition;
            frame.style['-ms-transition'] = cssTransition;
            frame.style['transition'] = cssTransition;
          }
          frame.style.height = creativeHeight + 'px';
          break;
      }
    }

    APPNEXUS.ready(function () {
      windowProxy = new Porthole.WindowProxy(null, 'an-' + uid);
      windowProxy.addEventListener(onMessage);
    });

    document.write('<iframe id="an-'+uid+'" name="an-'+uid+'" src="'+mediaURL+'" width="'+creativeWidth+'" height="'+creativeHeight+'" frameborder="0" scrolling="no" allowfullscreen="true" style="width: '+creativeWidth+'px; height: '+creativeHeight+'px; "></iframe>');

  }
}