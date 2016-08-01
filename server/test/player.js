'use strict';

const chai = require('chai');
const expect = chai.expect;
const Player = require('../src/player');


describe('Player', function() {

    describe('extractName()', function() {

        it('should extract the player name from WebSocket URL', function() {
            const name = Player.extractName('/somPath?John');
            expect(name).to.equal('John');
        });

        it('should not exceed max length', function() {
            const name = Player.extractName('/ws/?12345678901234567890', 11);
            expect(name).to.equal('12345678901');
        });

        it('should create a random name if it was not provided via URL', function() {
            let name = Player.extractName('/');
            expect(name.indexOf('Anonymous')).to.equal(0);

            name = Player.extractName('/?');
            expect(name.indexOf('Anonymous')).to.equal(0);

            name = Player.extractName('/??');
            expect(name.indexOf('Anonymous')).to.equal(0);

            name = Player.extractName('');
            expect(name.indexOf('Anonymous')).to.equal(0);
        });

    });

});