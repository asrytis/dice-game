import { createReducer } from 'redux-create-reducer';
import { WS_CONNECT, WS_CONNECTED, WS_DISCONNECTED, WS_ERROR } from '../actions/ws';

const initialState = {
    isConnected: false,
    isConnecting: false,
    error: null,
};

export default createReducer(initialState, {
    [WS_CONNECT](state) {
        return {
            ...state,
            isConnecting: true,
            error: null,
        };
    },

    [WS_CONNECTED](state) {
        return {
            ...state,
            isConnected: true,
            isConnecting: false,
        };
    },

    [WS_ERROR](state, action) {
        return {
            ...state,
            error: action.payload,
        };
    },

    [WS_DISCONNECTED](state) {
        return {
            ...state,
            isConnecting: false,
            isConnected: false,
        };
    },
});
