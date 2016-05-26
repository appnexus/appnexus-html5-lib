var fs = require('fs');
var path = require('path');
var libSourceClient = fs.readFileSync(path.resolve(__dirname, '../../dist/appnexus-html5-lib.js'), 'utf-8');

if (!libSourceClient) throw new Error('Unable to load "' + path.resolve(__dirname, '../../dist/appnexus-html5-lib.js') + '"')

var clickUrl = 'http://www.example.com';


module.exports = {
  HTML5_WEBPAGE: '<html><head></head><body></body>',
  HTML5_ADVERTISEMENT: '<html><head></head><body></body>',
  HTML5_CLICK_URL: clickUrl,
  HTML5_ADVERTISEMENT_URL: 'http://vcdn.adnxs.com/p/creative-html/fe/c6/98/2e/fec6982e-d54b-4f89-91bb-08a9e5299abb?clickTag=' + encodeURIComponent(clickUrl),
  LIB_SOURCE_CLIENT: libSourceClient,
  EXPANDING_PROPERTIES_JSON: '{"data":{"action":"set-expand-properties","properties":{"width":600,"height":500,"floating":true,"interstitial":true,"expand":{"easing":"lineas","duration":500},"collapse":{"easing":"ease-in-out","duration":1000}}},"sourceOrigin":"http://vcdn.adnxs.com","targetOrigin":"*","sourceWindowName":"an-1623518d-9ead-92c5-1a4d-83770e5e048f","targetWindowName":""}',
  CLICK_MESSAGE: '{"data":{"action":"click"},"sourceOrigin":"http://vcdn.adnxs.com","targetOrigin":"*","sourceWindowName":"nodejs","targetWindowName":""}',
  SET_EXPAND_PROPS_MESSAGE: '{"data":{"action":"set-expand-properties","properties":{"width":600,"height":800}},"sourceOrigin":"http://vcdn.adnxs.com","targetOrigin":"*","sourceWindowName":"nodejs","targetWindowName":""}',
  EXPAND_MESSAGE: '{"data":{"action":"expand"},"sourceOrigin":"http://vcdn.adnxs.com","targetOrigin":"*","sourceWindowName":"nodejs","targetWindowName":""}',
  COLLAPSE_MESSAGE: '{"data":{"action":"collapse"},"sourceOrigin":"http://vcdn.adnxs.com","targetOrigin":"*","sourceWindowName":"nodejs","targetWindowName":""}'
};