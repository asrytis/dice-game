'use strict';

const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
const Player = require('../src/player');
const GameRoom = require('../src/game-room');


chai.use(spies);


describe('GameRoom', function() {

    it('addPlayer(player) should register player with the room', function() {
        const gameRoom = new GameRoom();

        expect(gameRoom.playerCount).to.equal(0);

        const player1 = new Player({ ws: {}, name: 'Player 1' });
        const player2 = new Player({ ws: {}, name: 'Player 2' });

        gameRoom.addPlayer(player1);
        expect(gameRoom.playerCount).to.equal(1);

        gameRoom.addPlayer(player2);
        expect(gameRoom.playerCount).to.equal(2);

        expect(player1.room === gameRoom).to.equal(true);
        expect(player2.room === gameRoom).to.equal(true);
    });

    it('removePlayer(player) should remove player from the list', function() {
        const gameRoom = new GameRoom();
        const player1 = new Player({ ws: {}, name: 'Player 1' });
        const player2 = new Player({ ws: {}, name: 'Player 2' });

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

    it('broadcast(message) should send message to all players in the room', function() {
        const gameRoom = new GameRoom();
        const player1 = new Player({ ws: { send: function(){} }, name: 'Player 1' });
        const player2 = new Player({ ws: { send: function(){} }, name: 'Player 2' });

        chai.spy.on(player1.ws, 'send');
        chai.spy.on(player2.ws, 'send');

        gameRoom.addPlayer(player1);
        gameRoom.addPlayer(player2);

        gameRoom.broadcast('Hello');

        expect(player1.ws.send).to.have.been.called.exactly(1);
        expect(player2.ws.send).to.have.been.called.exactly(1);

        gameRoom.broadcast('Hello again');

        expect(player1.ws.send).to.have.been.called.exactly(2);
        expect(player2.ws.send).to.have.been.called.exactly(2);
    });

    it('parseMessage(message) should convert string to object', function() {
        const gameRoom = new GameRoom();

        expect(gameRoom.parseMessage('{ "prop": 1 }')).to.eql({ prop: 1 });
        expect(gameRoom.parseMessage('{ invalidJSON }')).to.equal(null);
    });

});