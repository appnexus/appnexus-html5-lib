var jsdom = require('jsdom').jsdom;

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

require('../../src');

module.exports = jsdom;
