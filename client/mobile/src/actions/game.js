import { wsSendMessage } from './ws';
import { Actions } from 'react-native-router-flux';

export const GAME_STATE_SETUP = 'GAME_STATE_SETUP';
export const GAME_STATE_WAITING = 'GAME_STATE_WAITING';
export const GAME_STATE_READY = 'GAME_STATE_READY';
export const GAME_STATE_IN_PROGRESS = 'GAME_STATE_IN_PROGRESS';
export const CMD_SET_DICE = 'CMD_SET_DICE';
export const CMD_ROLL_DICE = 'CMD_ROLL_DICE';
export const SV_GAME_STATE = 'SV_GAME_STATE';
export const SV_PLAYER_JOINED = 'SV_PLAYER_JOINED';
export const SV_PLAYER_LEFT = 'SV_PLAYER_LEFT';
export const SV_GAME_STATE_CHANGED = 'SV_GAME_STATE_CHANGED';
export const SV_GAME_DATA_CHANGED = 'SV_GAME_DATA_CHANGED';

export const cmdSetDice = amount => wsSendMessage({ type: CMD_SET_DICE, payload: amount });
export const cmdRollDice = () => wsSendMessage({ type: CMD_ROLL_DICE });
