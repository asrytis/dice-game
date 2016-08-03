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
	CMD_ROLL_DICE: 'CMD_ROLL_DICE'
};