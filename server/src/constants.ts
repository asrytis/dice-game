// First player selects number of dice to roll
export const GAME_STATE_SETUP = 'GAME_STATE_SETUP';
// Waiting for at least 1 more player to join
export const GAME_STATE_WAITING = 'GAME_STATE_WAITING';
// Waiting for players to start the round
export const GAME_STATE_READY = 'GAME_STATE_READY';
// Round in progress
export const GAME_STATE_IN_PROGRESS = 'GAME_STATE_IN_PROGRESS';

// Commands sent by the client
export const CMD_SET_DICE = 'CMD_SET_DICE';
export const CMD_ROLL_DICE = 'CMD_ROLL_DICE';

// Commands sent by the server
export const SV_GAME_STATE = 'SV_GAME_STATE';
export const SV_PLAYER_JOINED = 'SV_PLAYER_JOINED';
export const SV_PLAYER_LEFT = 'SV_PLAYER_LEFT';
export const SV_GAME_STATE_CHANGED = 'SV_GAME_STATE_CHANGED';
export const SV_GAME_DATA_CHANGED = 'SV_GAME_DATA_CHANGED';
