'use strict';

module.exports = {
	// First player selects number of dice to roll
	GAME_STATE_SETUP: 'GAME_STATE_SETUP',
	// Waiting for at least 1 more player to join
	GAME_STATE_WAITING: 'GAME_STATE_WAITING',
	// Waiting for players to start the round
	GAME_STATE_READY: 'GAME_STATE_READY',
	// Round in progress
	GAME_STATE_IN_PROGRESS: 'GAME_STATE_IN_PROGRESS',

	// Commands sent by the client
	CMD_SET_DICE: 'CMD_SET_DICE',
	CMD_ROLL_DICE: 'CMD_ROLL_DICE',

	// Commands sent by the server
	SV_GAME_STATE: 'SV_GAME_STATE',
	SV_PLAYER_JOINED: 'SV_PLAYER_JOINED',
	SV_PLAYER_LEFT: 'SV_PLAYER_LEFT',
	SV_GAME_STATE_CHANGED: 'SV_GAME_STATE_CHANGED',
	SV_GAME_DATA_CHANGED: 'SV_GAME_DATA_CHANGED'
};