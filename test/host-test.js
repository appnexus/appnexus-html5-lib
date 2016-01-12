var expect = require('chai').expect;
var jsdom = require('./helpers/jsdom');

describe('appnexus-html5-lib host', function () {

  beforeEach(function () {
    // iframe = window.APPNEXUS.placement('', 'http://example.com', 300, 250);
    // (function (window, APPNEXUS) {
    //   iframe.contentWindow.APPNEXUS = new APPNEXUS();
    // })(iframe.contentWindow, window.APPNEXUS.constructor)
  })

  it('creates a placement', function () {
    window.APPNEXUS.placement('http://example.com/ads/index.html', 'http://example.com', 300, 250);

    var iframe = document.getElementsByTagName('iframe')[0];
    expect(iframe).to.be.ok;
  });
});