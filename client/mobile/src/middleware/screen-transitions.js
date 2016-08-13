import { Actions } from 'react-native-router-flux';
import { GAME_STATE_SETUP, SV_GAME_STATE, SV_GAME_STATE_CHANGED } from '../actions/game';
import { WS_ERROR, WS_DISCONNECTED } from '../actions/ws';

const screenTransitionsMiddleware = ({ dispatch, getState }) => next => action => {

    switch (action.type) {
        case SV_GAME_STATE:
            const state = action.payload.state;
            if (state.stateName === GAME_STATE_SETUP) {
                Actions[state.players.length === 1 ? 'game-setup' : 'game']();
            }
        break;

        case SV_GAME_STATE_CHANGED:
            Actions.game();
        break;

        case WS_ERROR:
        case WS_DISCONNECTED:
            Actions.popTo('home');
        break;
    }

    return next(action);
};

export default screenTransitionsMiddleware;
