'use strict';

const config = require('./config');
const WebSocketServer = require('ws').Server;
const Player = require('./player');
const GameServer = require('./game-server');


const gameServer = new GameServer();

const wss = new WebSocketServer({
    port: config.wsPort,
    path: config.wsPath
});

wss.on('connection', function(ws) {

    const player = new Player({
        ws,
        name: Player.extractName(ws.upgradeReq.url, config.playerNameMaxLength)
    });

    gameServer.addPlayer(player);

    ws.on('message', function(message) {
        gameServer.processMessage(player, message);
    });

    ws.once('close', function() {
        gameServer.removePlayer(player);
    });

});

console.log('Websocket server listening on %s:%s', config.wsPath, config.wsPort);