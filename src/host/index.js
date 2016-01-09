'use strict';

var guid = require('../lib/guid');
var utils = require('../lib/utils');
var Porthole = require('../lib/porthole');

module.exports.ready = function () {};
module.exports.placement = function (APPNEXUS) {
  return function (mediaURL, landingPageURL, creativeWidth, creativeHeight) {
    var uid = guid();

    function overlayElement(el, z) {
      el.style.top = el.style.left = el.style.right = el.style.bottom = 0;
      el.style.width = el.style.height = '100%';
      el.style.zIndex = z;
      el.style.position = 'absolute';
      return el;
    }

    function addCSSTranstions(el, cssTransition) {
      el.style['-webkit-transition'] = cssTransition;
      el.style['-moz-transition'] = cssTransition;
      el.style['-ms-transition'] = cssTransition;
      el.style['transition'] = cssTransition;
    }

    if (APPNEXUS.debug) console.log('Host placement created');

    var expandProperties = {};
    var windowProxy = new Porthole.WindowProxy(null, 'an-' + uid);
    windowProxy.addEventListener(function (messageEvent) {
      var frame = document.getElementById('an-' + uid);
      switch(messageEvent.data.action) {

        case 'click':
          window.open(landingPageURL);
          break;

        case 'set-expand-properties':
          expandProperties = messageEvent.data.properties || {};
          if (expandProperties.floating) {
            frame.style.position = 'absolute';
          }
          break;

        case 'expand':
          if (expandProperties.interstitial) {
            frame.overlay = document.createElement('div');
            frame.overlay.style.backgroundColor = expandProperties.overlayColor || 'rgba(0,0,0,0.5)';
            document.body.appendChild(frame.overlay);
            overlayElement(frame.overlay, 99999);
            overlayElement(frame, 100000);
          }

          if (expandProperties.expand && (expandProperties.expand.easing || expandProperties.expand.duration)) {
            addCSSTranstions(frame, utils.sprintf('width, height, %sms %s', parseInt(expandProperties.expand.duration || 0, 10), expandProperties.expand.easing));
          }
          if (!isNaN(expandProperties.height)) {
            frame.style.height = expandProperties.height + 'px';
          }
          if (!isNaN(expandProperties.width)) {
            frame.style.width = expandProperties.width + 'px';
          }
          break;

        case 'collapse':
          var frame = document.getElementById('an-' + uid);
          if (frame.overlay) {
            frame.overlay.remove();
            frame.overlay = null;
          }
          if (expandProperties.collapse && (expandProperties.collapse.easing || expandProperties.collapse.duration)) {
            addCSSTranstions(frame, utils.sprintf('width, height, %sms %s', parseInt(expandProperties.collapse.duration || 0, 10), expandProperties.collapse.easing));
          }
          frame.style.height = creativeHeight + 'px';
          break;
      }
    });

    document.write('<iframe id="an-'+uid+'" name="an-'+uid+'" src="'+mediaURL+'" width="'+creativeWidth+'" height="'+creativeHeight+'" frameborder="0" scrolling="no" allowfullscreen="true" style="width: '+creativeWidth+'px; height: '+creativeHeight+'px; "></iframe>');

  }
}