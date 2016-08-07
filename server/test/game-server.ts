import { expect } from 'chai';
import GameServer from '../src/game-server';
import GameRoom from '../src/game-room';
import GameState from '../src/game-state';
import { createPlayer } from './test-helpers/player';
import { createGameRoomOptions } from './test-helpers/game-room';


const createGameServerOptions = (maxPlayers: number) => ({
    roomFactory: () => new GameRoom(createGameRoomOptions(maxPlayers))
});

describe('game-server', function() {

    describe('findAvailableRoom()', function() {

        it('should create a room when no rooms exist', function() {
            const gameServer = new GameServer(createGameServerOptions(3));
            expect(gameServer.roomCount).to.equal(0);
            
            const room = gameServer.findAvailableRoom();
            expect(gameServer.roomCount).to.equal(1);
        });

        it('should reuse an existing room', function() {
            const gameServer = new GameServer(createGameServerOptions(3));

            const room = gameServer.findAvailableRoom();
            const anotherRoom = gameServer.findAvailableRoom();
            
            expect(gameServer.roomCount).to.equal(1);
            expect(room === anotherRoom).to.equal(true);
        });

        it('should create a new room when others are full', function() {
            const gameServer = new GameServer(createGameServerOptions(2));
            
            gameServer.findAvailableRoom().addPlayer(createPlayer('Player 1'));
            gameServer.findAvailableRoom().addPlayer(createPlayer('Player 2'));
            expect(gameServer.roomCount).to.equal(1);
            
            gameServer.findAvailableRoom().addPlayer(createPlayer('Player 3'));
            expect(gameServer.roomCount).to.equal(2);
        });

    });

    it('removeRoomIfEmpty() should remove a room that has no players registered', function() {
        const gameServer = new GameServer(createGameServerOptions(3));

        const player = createPlayer('Player 1');
        const room = gameServer.findAvailableRoom();
        
        room.addPlayer(player);
        gameServer.removeRoomIfEmpty(room);
        expect(gameServer.roomCount).to.equal(1);

        room.removePlayer(player);
        gameServer.removeRoomIfEmpty(room);
        expect(gameServer.roomCount).to.equal(0);

    });

});
