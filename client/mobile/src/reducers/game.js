import { createReducer } from 'redux-create-reducer';
import {
    SV_GAME_STATE,
    SV_PLAYER_JOINED,
    SV_PLAYER_LEFT,
    SV_GAME_STATE_CHANGED,
    SV_GAME_DATA_CHANGED
} from '../actions/game';

const initialState = {
    stateName: '',
    players: [],
    gameData: {},
    serverTime: 0
};

export default createReducer(initialState, {
    [SV_GAME_STATE](state, action) {
        return {
            ...action.payload.state
        };
    },

    [SV_PLAYER_JOINED](state, action) {
        return {
            ...state,
            players: [...state.players, action.payload]
        };
    },

    [SV_PLAYER_LEFT](state, action) {
        return {
            ...state,
            players: state.players.filter(player => player.id !== action.payload.id)
        };
    },

    [SV_GAME_STATE_CHANGED](state, action) {
        return {
            ...state,
            stateName: action.payload
        };
    },

    [SV_GAME_DATA_CHANGED](state, action) {
        return {
            ...state,
            serverTime: action.payload.serverTime,
            gameData: {
                ...state.gameData,
                ...action.payload.changes
            }
        };
    }
});
