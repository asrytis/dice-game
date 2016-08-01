'use strict';

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({
	port: 3000
});

wss.on('connection', function(ws) {

	console.log('new connection', ws.upgradeReq.url);

	ws.on('message', function(message) {
		console.log('message:', message);
	});

	ws.once('close', function() {
		console.log('Connection closed');
	});

});