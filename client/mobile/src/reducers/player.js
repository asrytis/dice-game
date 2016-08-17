import { createReducer } from 'redux-create-reducer';
import { SV_GAME_STATE } from '../actions/game';
import { PLAYER_SET_NAME } from '../actions/player';

const initialState = {
    id: null,
    name: '',
};

export default createReducer(initialState, {
    [SV_GAME_STATE](state, action) {
        return {
            ...action.payload.player,
        };
    },

    [PLAYER_SET_NAME](state, action) {
        return {
            ...state,
            name: action.payload,
        };
    },
});
