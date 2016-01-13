var expect = require('chai').expect;
var guid = require('../src/lib/guid');

describe('Generate unique ID', function () {
    it('checks it is a function', function () {
        expect(guid).to.be.a('function');
    });

    it('checks it generates a string', function () {
    	var result = guid();
    	expect(result).to.be.a('string');
    });

    it('checks if it generates different id', function () {
    	var result1 = guid();
    	var result2 = guid();
    	var result3 = guid();

    	expect(result1).to.not.equal(result2);
    	expect(result2).to.not.equal(result3);
    	expect(result1).to.not.equal(result3);
    });
});
