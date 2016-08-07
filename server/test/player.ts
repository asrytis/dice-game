import { expect } from 'chai';
import Player from '../src/player';
import { createPlayer } from './test-helpers/player';


describe('Player', function() {

    it('should be instantiated with unique ID', function() {
        const players = Array(100).fill(1).map(() => createPlayer('Player'));
        const playerIDs = players.map((player) => player.id);
        const containsDuplicates = playerIDs.some((id, index) => playerIDs.indexOf(id) !== index);
        expect(containsDuplicates).to.equal(false);
    });

    describe('extractName(url)', function() {

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
