var expect = require('chai').expect;
var jsdom = require('./helpers/jsdom');
var sinon = require('sinon');
var fixtures = require('./helpers/fixtures');

describe('appnexus-html5-lib client', function () {
  var windowObject;

  beforeEach(function (done) {
    jsdom.createPage(fixtures.HTML5_ADVERTISEMENT_URL, fixtures.HTML5_ADVERTISEMENT, [fixtures.LIB_SOURCE_CLIENT], function (window) {
      windowObject = window;
      done();
    });
  });


  it('triggered APPNEXUS.ready', function (done) {
    windowObject.APPNEXUS.ready(function () {
      done();
    });
  });

  it('gets correct clickTag from URL', function (done) {
    windowObject.APPNEXUS.ready(function () {
      expect(windowObject.APPNEXUS.getClickTag()).to.equal(fixtures.HTML5_CLICK_URL);
      done();
    });
  });

  it('check APPNEXUS.click() opens new window', function  (done) {
    var spy = sinon.spy(windowObject, 'open');

    windowObject.APPNEXUS.ready(function () {
      windowObject.APPNEXUS.click();
      expect(spy.calledOnce).to.equal(true);
      done();
    });
  });

  it('check APPNEXUS.setExpandProperties() sends postMessage to host', function  (done) {
    var spy = sinon.spy(windowObject, 'postMessage');

    windowObject.APPNEXUS.ready(function () {
      windowObject.APPNEXUS.setExpandProperties({
        width: 600,
        height: 800
      });
      expect(spy.withArgs(fixtures.SET_EXPAND_PROPS_MESSAGE).calledOnce).to.equal(true);
      done();
    });
  });

  it('check APPNEXUS.getExpandProperties() returns the correct properties', function  (done) {
    windowObject.APPNEXUS.ready(function () {
      windowObject.APPNEXUS.setExpandProperties({
        width: 600,
        height: 800
      });

      expect(windowObject.APPNEXUS.getExpandProperties()).to.eql({ width: 600, height: 800 });
      done();
    });
  });

  it('check APPNEXUS.expand() sends postMessage to host', function  (done) {
    var spy = sinon.spy(windowObject, 'postMessage');

    windowObject.APPNEXUS.ready(function () {
      windowObject.APPNEXUS.expand();
      expect(spy.withArgs(fixtures.EXPAND_MESSAGE).calledOnce).to.equal(true);
      done();
    });
  });

  it('check APPNEXUS.collapse() sends postMessage to host', function  (done) {
    var spy = sinon.spy(windowObject, 'postMessage');

    windowObject.APPNEXUS.ready(function () {
      windowObject.APPNEXUS.collapse();
      expect(spy.withArgs(fixtures.COLLAPSE_MESSAGE).calledOnce).to.equal(true);
      done();
    });
  });

});