var expect = require('chai').expect;
var jsdom = require('./helpers/jsdom');
var fixtures = require('./helpers/fixtures')

describe('Porthole', function () {
  before(function (done) {
    jsdom.createPage(fixtures.HTML5_ADVERTISEMENT_URL, fixtures.HTML5_WEBPAGE, function (window) {
      global.window = window;
      done();
    });
  })

  after(function () {
    global.window = undefined;
  })

  it('checks it exits', function () {
    var porthole = require('../src/lib/porthole');
    expect(porthole).to.exist;
  });
});
