var fs = require('fs');
var path = require('path');
var libSource = fs.readFileSync(path.resolve(__dirname, '../../build/appnexus-html5-lib.js'), 'utf-8');

if (!libSource) throw new Error('Unable to load "' + path.resolve(__dirname, '../../build/appnexus-html5-lib.js') + '"')

module.exports = {
  HTML5_WEBPAGE: '<html><head></head><body></body>',
  HTML5_ADVERTISEMENT: '<html><head></head><body></body>',
  LIB_SOURCE: libSource,
  EXPANDING_PROPERTIES_JSON: '{"data":{"action":"set-expand-properties","properties":{"width":600,"height":500,"floating":true,"interstitial":true,"expand":{"easing":"lineas","duration":500},"collapse":{"easing":"ease-in-out","duration":1000}}},"sourceOrigin":"://","targetOrigin":"*","sourceWindowName":"an-1623518d-9ead-92c5-1a4d-83770e5e048f","targetWindowName":""}',
  CLICK_MESSAGE: '{"data":{"action":"click"},"sourceOrigin":"://","targetOrigin":"*","sourceWindowName":"nodejs","targetWindowName":""}',
  SET_EXPAND_PROPS_MESSAGE: '{"data":{"action":"set-expand-properties","properties":{"width":600,"height":800}},"sourceOrigin":"://","targetOrigin":"*","sourceWindowName":"nodejs","targetWindowName":""}',
  EXPAND_MESSAGE: '{"data":{"action":"expand"},"sourceOrigin":"://","targetOrigin":"*","sourceWindowName":"nodejs","targetWindowName":""}',
  COLLAPSE_MESSAGE: '{"data":{"action":"collapse"},"sourceOrigin":"://","targetOrigin":"*","sourceWindowName":"nodejs","targetWindowName":""}'
};