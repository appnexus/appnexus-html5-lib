var expect = require('chai').expect;
var jsdom = require('./helpers/jsdom');
var sinon = require('sinon');
var fixtures = require('./helpers/fixtures');

describe('appnexus-html5-lib host', function () {
  var parentWindow, iframe;

  beforeEach(function (done) {
    jsdom.createPage(fixtures.HTML5_WEBPAGE, [fixtures.LIB_SOURCE_HOST], function (window) {
      parentWindow = window;
      iframe = window.APPNEXUS.placement('about:blank', 'http://example.com', 300, 250);
      iframe.contentDocument.write(fixtures.HTML5_ADVERTISEMENT);
      iframe.contentWindow.name = iframe.name;
      jsdom.injectScript(iframe.contentDocument, fixtures.LIB_SOURCE_CLIENT, function () {
        iframe.contentWindow.APPNEXUS.ready(function () {
          done();
        });
      });
    });
  });

  it('creates a placement', function () {
    var el = parentWindow.document.getElementsByTagName('iframe')[0];
    expect(el).to.be.ok;
  });

  it('check host does not handle "click" event from client', function (done) {
    var spy = sinon.spy(parentWindow, 'open');

    parentWindow.addEventListener('message', function () {
      expect(spy.notCalled).to.equal(true);
      done();
    });

    iframe.contentWindow.APPNEXUS.click();
  });

  it('host recieves "set-expand-properties" message from client', function (done) {
    iframe.contentWindow.name = 'an-1623518d-9ead-92c5-1a4d-83770e5e048f';

    parentWindow.addEventListener('message', function (event) {
      expect(event.data).to.equal(fixtures.EXPANDING_PROPERTIES_JSON);
      done();
    });

    iframe.contentWindow.APPNEXUS.setExpandProperties({
      width: 600,
      height: 500,
      floating: true,
      interstitial: true,
      expand: {
        easing: 'lineas',
        duration: 500
      },
      collapse: {
        easing: 'ease-in-out',
        duration: 1000
      }
    });

  });

  it ('host expands the iframe to a given "width" and "height" by client', function (done){
    parentWindow.addEventListener('message', function (event) {
      var message = JSON.parse(event.data);
      if (message.data.action === 'expand') {
        expect(iframe.style.width).to.equal('600px');
        expect(iframe.style.height).to.equal('500px');
        done();
      }
    });

    iframe.contentWindow.APPNEXUS.setExpandProperties({
      width: 600,
      height: 500
    });

    iframe.contentWindow.APPNEXUS.expand();
  });

  it ('host collapses the iframe to a the initial "width" and "height" after being expanded by client', function (done){
    parentWindow.addEventListener('message', function (event) {
      var message = JSON.parse(event.data);
      if (message.data.action === 'collapse') {
        expect(iframe.style.width).to.equal('300px');
        expect(iframe.style.height).to.equal('250px');
        done();
      }
    });

    iframe.contentWindow.APPNEXUS.setExpandProperties({
      width: 600,
      height: 500
    });

    iframe.contentWindow.APPNEXUS.expand();

    iframe.contentWindow.APPNEXUS.collapse();
  });

});