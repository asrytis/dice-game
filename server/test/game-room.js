'use strict';

const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
const GameRoom = require('../src/game-room');


chai.use(spies);


describe('GameRoom', function() {

    it('addPlayer() should add player to the list', function() {
        const gameRoom = new GameRoom();

        expect(gameRoom.playerCount).to.equal(0);

        gameRoom.addPlayer({ });
        expect(gameRoom.playerCount).to.equal(1);

        gameRoom.addPlayer({ });
        expect(gameRoom.playerCount).to.equal(2);
    });

    it('removePlayer() should remove player from the list', function() {
        const gameRoom = new GameRoom();
        const player1 = { };
        const player2 = { };

        gameRoom.addPlayer(player1);
        gameRoom.addPlayer(player2);

        gameRoom.removePlayer(player1);
        expect(gameRoom.playerCount).to.equal(1);

        // Player count shouldn't change when removing a player that's not on the list anymore
        gameRoom.removePlayer(player1);
        expect(gameRoom.playerCount).to.equal(1);

        gameRoom.removePlayer(player2);
        expect(gameRoom.playerCount).to.equal(0);
    });

    it('broadcast() should send message to all players in the room', function() {
        const gameRoom = new GameRoom();
        const player1 = { ws: { send: function(){} } };
        const player2 = { ws: { send: function(){} } };

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

});