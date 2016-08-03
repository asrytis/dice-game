'use strict';

const chai = require('chai');
const expect = chai.expect;
const GameServer = require('../src/game-server');
const GameRoom = require('../src/game-room');


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
            
            gameServer.findAvailableRoom().addPlayer({});
            gameServer.findAvailableRoom().addPlayer({});
            expect(gameServer.roomCount).to.equal(1);
            
            gameServer.findAvailableRoom().addPlayer({});
            expect(gameServer.roomCount).to.equal(2);
        });

    });

    it('removeRoomIfEmpty() should remove a room that has no players registered', function() {
        const gameServer = new GameServer({ roomFactory: () => new GameRoom({ maxPlayers: 3 }) });

        const player = { };
        const room = gameServer.findAvailableRoom();
        
        room.addPlayer(player);
        gameServer.removeRoomIfEmpty(room);
        expect(gameServer.roomCount).to.equal(1);

        room.removePlayer(player);
        gameServer.removeRoomIfEmpty(room);
        expect(gameServer.roomCount).to.equal(0);

    });

});