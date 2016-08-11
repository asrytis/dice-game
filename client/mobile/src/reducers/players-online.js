import { createReducer } from 'redux-create-reducer';
import { PLAYERS_REQUEST, PLAYERS_REQUEST_SUCCESS, PLAYERS_REQUEST_FAILURE } from '../actions/players-online';

const initialState = {
    isFetching: false,
    error: null,
    value: null
};

export default createReducer(initialState, {
    [PLAYERS_REQUEST](state, action) {
        return {
            ...state,
            error: null,
            isFetching: true
        };
    },

    [PLAYERS_REQUEST_SUCCESS](state, action) {
        return {
            ...state,
            isFetching: false,
            value: action.payload
        };
    },

    [PLAYERS_REQUEST_FAILURE](state, action) {
        return {
            ...state,
            isFetching: false,
            error: action.payload
        };
    }
});
