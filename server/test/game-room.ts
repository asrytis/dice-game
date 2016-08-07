import * as chai from 'chai';
import GameState from '../src/game-state';
import { default as GameRoom, GameRoomOptions } from '../src/game-room';
import { createPlayer } from './test-helpers/player';
import { createGameRoomOptions } from './test-helpers/game-room';
const spies = require('chai-spies'); // chai-spies incompatible with ES6 imports
const expect = chai.expect;

chai.use(spies);


describe('GameRoom', function() {

    describe('addPlayer(player)', function() {

        it('should register player with the room', function() {
            const gameRoom = new GameRoom(createGameRoomOptions(6));

            expect(gameRoom.playerCount).to.equal(0);

            const player1 = createPlayer('Player 1');
            const player2 = createPlayer('Player 2');

            gameRoom.addPlayer(player1);
            expect(gameRoom.playerCount).to.equal(1);

            gameRoom.addPlayer(player2);
            expect(gameRoom.playerCount).to.equal(2);

            expect(player1.room === gameRoom).to.equal(true);
            expect(player2.room === gameRoom).to.equal(true);
        });

        it('should throw an error when trying to add more players than the room supports', function() {
            const gameRoom = new GameRoom(createGameRoomOptions(2));

            gameRoom.addPlayer(createPlayer('Player 1'));
            gameRoom.addPlayer(createPlayer('Player 2'));

            const attemptToAddOneMore = () => gameRoom.addPlayer(createPlayer('Player 3'));
            expect(attemptToAddOneMore).to.throw(Error);
        });

    });

    it('removePlayer(player) should remove player from the list', function() {
        const gameRoom = new GameRoom(createGameRoomOptions(6));
        const player1 = createPlayer('Player 1');
        const player2 = createPlayer('Player 2');

        gameRoom.addPlayer(player1);
        gameRoom.addPlayer(player2);

        gameRoom.removePlayer(player1);
        expect(gameRoom.playerCount).to.equal(1);

        // Player count shouldn't change when removing a player that's not on the list anymore
        gameRoom.removePlayer(player1);
        expect(gameRoom.playerCount).to.equal(1);

        gameRoom.removePlayer(player2);
        expect(gameRoom.playerCount).to.equal(0);

        expect(player1.room).to.equal(null);
        expect(player2.room).to.equal(null);
    });

    it('broadcast(message, exclude) should send message to all players in the room', function() {
        const gameRoom = new GameRoom(createGameRoomOptions(6));
        const player1 = createPlayer('Player 1');
        const player2 = createPlayer('Player 2');

        gameRoom.addPlayer(player1);
        gameRoom.addPlayer(player2);

        chai.spy.on(player1.ws, 'send');
        chai.spy.on(player2.ws, 'send');

        gameRoom.broadcast({ msg: 'Hello' });

        expect(player1.ws.send).to.have.been.called.exactly(1);
        expect(player2.ws.send).to.have.been.called.exactly(1);

        gameRoom.broadcast({ data: 'Hello again' });

        expect(player1.ws.send).to.have.been.called.exactly(2);
        expect(player2.ws.send).to.have.been.called.exactly(2);

        // Exclude player1
        gameRoom.broadcast({ prop: 'Wadup' }, player1);

        expect(player1.ws.send).to.have.been.called.exactly(2);
        expect(player2.ws.send).to.have.been.called.exactly(3);
    });

    it('parseMessage(message) should convert string to object', function() {
        const gameRoom = new GameRoom(createGameRoomOptions(6));

        expect(gameRoom.parseMessage('{ "prop": 1 }')).to.eql({ prop: 1 });
        expect(gameRoom.parseMessage('{ invalidJSON }')).to.equal(null);
    });

});