var expect = require('chai').expect;
var sprintf = require('../src/lib/utils').sprintf;
var deepExtend = require('../src/lib/utils').deepExtend;

describe('Util functions', function () {
    it('checks sprintf works properly', function () {
        var result = sprintf("There are %s monkeys in %s.", 13, 'Disney');
        expect(result).to.be.equal("There are 13 monkeys in Disney.");
    });

    it('checks deepExtend works properly', function () {
    	var result = deepExtend({}, {'age': 3}, {'gender': 'male', 'father': {'age': 30, 'gender': 'male'}});
        expect(result).to.deep.equal({ age: 3, gender: 'male', father: { age: 30, gender: 'male' } })
    });
});
