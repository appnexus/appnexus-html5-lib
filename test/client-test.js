var expect = require('chai').expect;
var sinon = require('./helpers/sinon');
var jsdom = require('./helpers/jsdom');

describe('appnexus-html5-lib client', function () {
  var iframe;
  var nativePostMessage =  window.postMessage;

  afterEach(function () {
    window.postMessage = nativePostMessage;
  })

  it('triggered APPNEXUS.ready', function (done) {
    window.APPNEXUS.ready(function () {
      done();
    });
  });

  it('check APPNEXUS.click() sends postMessage to host', function  (done) {
    window.postMessage = function  (raw) {
      var message = JSON.parse(raw);
      expect(message.data.action).to.equal('click');
      done();
    }
    window.APPNEXUS.click();
  });

  it('check APPNEXUS.setExpandProperties() sends postMessage to host', function  (done) {
    window.postMessage = function  (raw) {
      var message = JSON.parse(raw);
      expect(message.data.action).to.equal('set-expand-properties');
      expect(message.data.properties).to.eql({ width: 600, height: 800 });
      done();
    }
    window.APPNEXUS.setExpandProperties({
      width: 600,
      height: 800
    });
  });

  it('check APPNEXUS.setExpandProperties() sends postMessage to host', function  () {
    window.APPNEXUS.setExpandProperties({
      width: 600,
      height: 800
    });

    expect(window.APPNEXUS.getExpandProperties()).to.eql({ width: 600, height: 800 });
  });

  it('check APPNEXUS.expand() sends postMessage to host', function  (done) {
    window.postMessage = function  (raw) {
      var message = JSON.parse(raw);
      expect(message.data.action).to.equal('expand');
      done();
    }
    window.APPNEXUS.expand();
  });

  it('check APPNEXUS.collapse() sends postMessage to host', function  (done) {
    window.postMessage = function  (raw) {
      var message = JSON.parse(raw);
      expect(message.data.action).to.equal('collapse');
      done();
    }
    window.APPNEXUS.collapse();
  });

});