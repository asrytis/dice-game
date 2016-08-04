'use strict';

const chai = require('chai');
const expect = chai.expect;
const GameServer = require('../src/game-server');
const GameRoom = require('../src/game-room');
const Player = require('../src/player');

class WebSocketMock {
    send() { }
}


describe('game-server', function() {

    describe('findAvailableRoom()', function() {

        it('should create a room when no rooms exist', function() {
            const gameServer = new GameServer({ roomFactory: () => new GameRoom({ maxPlayers: 3 }) });
            expect(gameServer.roomCount).to.equal(0);
            
            const room = gameServer.findAvailableRoom();
            expect(gameServer.roomCount).to.equal(1);
        });

        it('should reuse an existing room', function() {
            const gameServer = new GameServer({ roomFactory: () => new GameRoom({ maxPlayers: 3 }) });

            const room = gameServer.findAvailableRoom();
            const anotherRoom = gameServer.findAvailableRoom();
            
            expect(gameServer.roomCount).to.equal(1);
            expect(room === anotherRoom).to.equal(true);
        });

        it('should create a new room when others are full', function() {
            const gameServer = new GameServer({ roomFactory: () => new GameRoom({ maxPlayers: 2 }) });
            
            gameServer.findAvailableRoom().addPlayer(new Player({ ws: new WebSocketMock(), name: 'Player 1' }));
            gameServer.findAvailableRoom().addPlayer(new Player({ ws: new WebSocketMock(), name: 'Player 2' }));
            expect(gameServer.roomCount).to.equal(1);
            
            gameServer.findAvailableRoom().addPlayer(new Player({ ws: new WebSocketMock(), name: 'Player 3' }));
            expect(gameServer.roomCount).to.equal(2);
        });

    });

    it('removeRoomIfEmpty() should remove a room that has no players registered', function() {
        const gameServer = new GameServer({ roomFactory: () => new GameRoom({ maxPlayers: 3 }) });

        const player = new Player({ ws: new WebSocketMock(), name: 'Player 1' });
        const room = gameServer.findAvailableRoom();
        
        room.addPlayer(player);
        gameServer.removeRoomIfEmpty(room);
        expect(gameServer.roomCount).to.equal(1);

        room.removePlayer(player);
        gameServer.removeRoomIfEmpty(room);
        expect(gameServer.roomCount).to.equal(0);

    });

});