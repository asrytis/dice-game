import { config } from './config';
import * as http from 'http';
import { Server as WebSocketServer } from 'ws';
import { GAME_STATE_SETUP, GAME_STATE_WAITING, GAME_STATE_READY, GAME_STATE_IN_PROGRESS } from './constants';
import { SetupState, WaitingState, ReadyState, InProgressState } from './game-states';
import Player from './player';
import GameRoom from './game-room';
import GameServer from './game-server';


const roomFactory = () => new GameRoom({
    maxPlayers: config.playersPerRoom,
    defaultState: GAME_STATE_SETUP,
    stateFactory: (gameRoom: GameRoom) => ({
        [GAME_STATE_SETUP]: new SetupState(gameRoom),
        [GAME_STATE_WAITING]: new WaitingState(gameRoom),
        [GAME_STATE_READY]: new ReadyState(gameRoom),
        [GAME_STATE_IN_PROGRESS]: new InProgressState(gameRoom, config.roundDuration)
    })
});

const gameServer = new GameServer({ roomFactory });

//
// Providing the number of players online
//
const server = http.createServer(function(req, res) {
    
    if (req.url === `${config.httpPath}/player-count`) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        
        return res.end(JSON.stringify({
            playerCount: gameServer.playerCount
        }));
    }

    res.end();
});

//
// Websocket server
//
const wss = new WebSocketServer({
    server,
    path: config.wsPath
});

wss.on('connection', function(ws) {

    const name = Player.extractName(ws.upgradeReq.url, config.playerNameMaxLength);
    const player = new Player({ ws, name });

    gameServer.findAvailableRoom().addPlayer(player);

    ws.on('message', function(message) {
        player.room.processMessage(message, player);
    });

    ws.on('close', function() {
        const room = player.room;
        room.removePlayer(player);
        gameServer.removeRoomIfEmpty(room);
    });

});

server.listen(config.port);
console.log('Listening on port', config.port);
