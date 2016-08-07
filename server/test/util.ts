import { expect } from 'chai';
import { inRange, randomInRange } from '../src/util';


describe('util', function() {

    it('inRange(value, min, max)', function() {
        expect(inRange(5, 0, 10)).to.equal(true);
        expect(inRange(1, 0, 1)).to.equal(true);
        expect(inRange(0, 0, 1)).to.equal(true);
        expect(inRange(0, 0, 1)).to.equal(true);
        
        expect(inRange(-5, -10, 0)).to.equal(true);
        expect(inRange(-5, -5, 0)).to.equal(true);

        expect(inRange(2, -1, 1)).to.equal(false);
        expect(inRange(-2, -1, 1)).to.equal(false);
    });

    it('randomInRange(min, max)', function() {

        function testRange(min: number, max: number) {
            const randomValues = Array(100).fill(0).map(() => randomInRange(min, max));
            const allWithinRange = randomValues.every((value) => inRange(value, min, max));
            expect(allWithinRange).to.equal(true);
        }

        testRange(1, 6);
        testRange(0, 10);
        testRange(-10, 10);
    });

});
