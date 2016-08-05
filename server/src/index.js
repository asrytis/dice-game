'use strict';

const config = require('./config');
const http = require('http');
const WebSocketServer = require('ws').Server;
const Player = require('./player');
const GameRoom = require('./game-room');
const GameServer = require('./game-server');


const gameServer = new GameServer({
    roomFactory: () => new GameRoom({
        maxPlayers: config.playersPerRoom
    })
});

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

    const player = new Player({
        ws,
        name: Player.extractName(ws.upgradeReq.url, config.playerNameMaxLength)
    });

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