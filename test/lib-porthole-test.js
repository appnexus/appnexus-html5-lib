var expect = require('chai').expect;
var porthole = require('../src/lib/porthole');

describe('Porthole', function () {
    it('checks it exits', function () {
        expect(porthole).to.exist;
    });
});
