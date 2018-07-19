var expect = require('chai').expect;
var jsdom = require('./helpers/jsdom');
var sinon = require('sinon');
var fixtures = require('./helpers/fixtures');
var Porthole;

var windowObject;

describe('appnexus-html5-lib client', function () {
  beforeEach(function (done) {
    jsdom.createPage(fixtures.HTML5_ADVERTISEMENT_URL, fixtures.HTML5_ADVERTISEMENT, [fixtures.LIB_SOURCE_CLIENT], function (window) {
      windowObject = window;
      global.window = window
      window = window || {};

      global.document = window.document;
      Porthole = require('../src/lib/porthole');;
      var windowProxy = new Porthole.WindowProxy('http://localhost');

      var adData = {
        macros: {
          'macro_1': 'lorem',
          'macro_2': 'ipsum',
        }
      }
      windowProxy.post({ action: 'setAdData', parameters: adData });

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

  it('check APPNEXUS.click() opens new window', function (done) {
    var spy = sinon.spy(windowObject, 'open');

    windowObject.APPNEXUS.ready(function () {
      windowObject.APPNEXUS.click();
      expect(spy.calledOnce).to.equal(true);
      done();
    });
  });

  it('check APPNEXUS.setExpandProperties() sends postMessage to host', function (done) {
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

  it('check APPNEXUS.getExpandProperties() returns the correct properties', function (done) {
    windowObject.APPNEXUS.ready(function () {
      windowObject.APPNEXUS.setExpandProperties({
        width: 600,
        height: 800
      });

      expect(windowObject.APPNEXUS.getExpandProperties()).to.eql({ width: 600, height: 800 });
      done();
    });
  });

  it('check APPNEXUS.expand() sends postMessage to host', function (done) {
    var spy = sinon.spy(windowObject, 'postMessage');

    windowObject.APPNEXUS.ready(function () {
      windowObject.APPNEXUS.expand();
      expect(spy.withArgs(fixtures.EXPAND_MESSAGE).calledOnce).to.equal(true);
      done();
    });
  });

  it('check APPNEXUS.collapse() sends postMessage to host', function (done) {
    var spy = sinon.spy(windowObject, 'postMessage');

    windowObject.APPNEXUS.ready(function () {
      windowObject.APPNEXUS.collapse();
      expect(spy.withArgs(fixtures.COLLAPSE_MESSAGE).calledOnce).to.equal(true);
      done();
    });
  });

  it('should return undefined for a non existing macro', function (done) {
    windowObject.APPNEXUS.ready(function () {
      expect(windowObject.APPNEXUS.getMacroByName("non_existing_macro")).to.equal(undefined)
      done();
    })
  })

  it('should call getMacroByName once when attempting to require a macro value', function (done) {
    var macro = 'blah';
    var spy = sinon.spy();
    sinon.replace(windowObject.APPNEXUS, 'getMacroByName', spy);

    windowObject.APPNEXUS.ready(function () {
      windowObject.APPNEXUS.getMacroByName(macro);
      expect(spy.withArgs(macro).calledOnce).to.equal(true);
      expect(spy.calledOnce).to.be.true;
      sinon.restore();
      done();
    });
  });
});