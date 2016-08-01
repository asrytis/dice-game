'use strict';

const config = require('./config');
const WebSocketServer = require('ws').Server;
const Player = require('./player');
const GameRoom = require('./game-room');
const GameServer = require('./game-server');


const gameServer = new GameServer({
    roomClass: GameRoom,
    playersPerRoom: config.playersPerRoom
});

const wss = new WebSocketServer({
    port: config.wsPort,
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

    ws.once('close', function() {
        player.room.removePlayer(player);
        gameServer.removeRoomIfEmpty(player.room);
    });

});

console.log('Websocket server listening on %s:%s', config.wsPath, config.wsPort);