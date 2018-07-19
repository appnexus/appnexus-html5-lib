var expect = require('chai').expect;
var jsdom = require('./helpers/jsdom');
var fixtures = require('./helpers/fixtures');
var Porthole;
var windowProxy;
var windowObject;

var adData = {
	macros: {
		'macro_1': 'lorem',
		'macro_2': 'ipsum',
	}
};

describe('client events', function () {
	beforeEach(function (done) {
		jsdom.createPage(fixtures.HTML5_ADVERTISEMENT_URL, fixtures.HTML5_ADVERTISEMENT, [fixtures.LIB_SOURCE_CLIENT], function (window) {
			windowObject = window;
			global.window = window
			Porthole = require('../src/lib/porthole');;

			windowProxy = new Porthole.WindowProxy('http://localhost/');
			done();
		});
	});

	it('shouldnt trigger APPNEXUS.ready until a message from the porthole happens', function (done) {
		windowObject.APPNEXUS.ready(function () {
			done('this should not happen');
		});
		done();
	});

	it('should trigger appnexus ready since a post happend from the porthole with action setAdData and adData object info', function (done) {
		windowProxy.post({ action: 'setAdData', parameters: adData });

		windowObject.APPNEXUS.ready(function () {
			done();
		});
	});

	it('macros should be available right after appnexus.ready is called', function (done) {
		windowProxy.post({ action: 'setAdData', parameters: adData });

		windowObject.APPNEXUS.ready(function () {
			expect(windowObject.APPNEXUS.getMacroByName('macro_1')).to.equal('lorem')
			expect(windowObject.APPNEXUS.getMacroByName('macro_2')).to.equal('ipsum')
			expect(windowObject.APPNEXUS.getMacroByName('macro_undefined')).to.equal(undefined)
			done();
		});
	});
});