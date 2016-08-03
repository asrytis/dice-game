'use strict';

const chai = require('chai');
const expect = chai.expect;
const util = require('../src/util');


describe('util', function() {

    it('inRange(value, min, max)', function() {
        expect(util.inRange(5, 0, 10)).to.equal(true);
        expect(util.inRange(1, 0, 1)).to.equal(true);
        expect(util.inRange(0, 0, 1)).to.equal(true);
        expect(util.inRange(0, 0, 1)).to.equal(true);
        
        expect(util.inRange(-5, -10, 0)).to.equal(true);
        expect(util.inRange(-5, -5, 0)).to.equal(true);

        expect(util.inRange(2, -1, 1)).to.equal(false);
        expect(util.inRange(-2, -1, 1)).to.equal(false);
    });

    it('randomInRange(min, max)', function() {

        function testRange(min, max) {
            const randomValues = Array(100).fill(0).map(() => util.randomInRange(min, max));
            const allWithinRange = randomValues.every((value) => util.inRange(value, min, max));
            expect(allWithinRange).to.equal(true);
        }

        testRange(1, 6);
        testRange(0, 10);
        testRange(-10, 10);
    });

});