'use strict';

const chai = require('chai');
const expect = chai.expect;
const GameServer = require('../src/game-server');


describe('game-server', function() {

	it('addPlayer() should add player to the list', function() {
		const gameServer = new GameServer();

		expect(gameServer.playerCount).to.equal(0);

		gameServer.addPlayer({ });
		expect(gameServer.playerCount).to.equal(1);

		gameServer.addPlayer({ });
		expect(gameServer.playerCount).to.equal(2);
	});

	it('removePlayer() should remove player from the list', function() {
		const gameServer = new GameServer();
		const player1 = { };
		const player2 = { };

		gameServer.addPlayer(player1);
		gameServer.addPlayer(player2);

		gameServer.removePlayer(player1);
		expect(gameServer.playerCount).to.equal(1);

		// Player count shouldn't change when removing a player that's not on the list anymore
		gameServer.removePlayer(player1);
		expect(gameServer.playerCount).to.equal(1);

		gameServer.removePlayer(player2);
		expect(gameServer.playerCount).to.equal(0);
	});

});