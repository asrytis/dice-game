import { Actions } from 'react-native-router-flux';
import { GAME_STATE_SETUP, SV_GAME_STATE, SV_GAME_STATE_CHANGED, SV_PLAYER_LEFT } from '../actions/game';
import { WS_ERROR, WS_DISCONNECTED } from '../actions/ws';

/**
 * Transitioning between home/game-setup/game screens based on certain events
 * @TODO: this logic should really be part of the Game scene and the scene itself should be split into game-setup and game-progress components
 */
const screenTransitionsMiddleware = ({ dispatch, getState }) => next => action => {
    const result = next(action);

    switch (action.type) {

        // Player just joined a match and should be transitioned to 
        // the Game Setup screen if he's the only player in the room
        case SV_GAME_STATE:
            const state = action.payload.state;
            if (state.stateName === GAME_STATE_SETUP) {
                Actions[state.players.length === 1 ? 'game-setup' : 'game']();
            }
        break;

        // If player joins a match which is in setup state and then the host leaves, 
        // the player should become the host and setup the game
        case SV_GAME_STATE_CHANGED:
        case SV_PLAYER_LEFT:
            const { game, player } = getState();
            if (game.stateName === GAME_STATE_SETUP && game.players[0].id === player.id) {
                Actions['game-setup']();
            } else {
                Actions.game();
            }
        break;

        // Go back home if WebSocket connection is lost
        case WS_ERROR:
        case WS_DISCONNECTED:
            Actions.popTo('home');
        break;
    }

    return result;
};

export default screenTransitionsMiddleware;
