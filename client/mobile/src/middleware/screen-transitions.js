import { Actions } from 'react-native-router-flux';
import { WS_ERROR, WS_DISCONNECTED } from '../actions/ws';
import {
    GAME_STATE_SETUP,
    SV_GAME_STATE,
    SV_GAME_STATE_CHANGED,
    SV_PLAYER_LEFT,
} from '../actions/game';

/**
 * Transitioning between game-setup/game screens based on game state
 * @NOTE: this logic could potentially be part of the Game scene and the
 * scene itself would be split into game-setup and game-progress components
 */
const handleTransition = (game, player) => {
    if (game.stateName === GAME_STATE_SETUP && game.players[0].id === player.id) {
        return Actions['game-setup']();
    }
    return Actions.game();
};

const screenTransitionsMiddleware = ({ getState }) => next => action => {
    const result = next(action);

    switch (action.type) {

        // Player just joined a match and should be transitioned to
        // the Game Setup screen if he's the only player in the room
        case SV_GAME_STATE: {
            const { state: game, player } = action.payload;
            handleTransition(game, player);
            break;
        }

        // If player joins a match which is in setup state and then the host leaves,
        // the player should become the host and setup the game
        case SV_GAME_STATE_CHANGED:
        case SV_PLAYER_LEFT: {
            const { game, player } = getState();
            handleTransition(game, player);
            break;
        }

        // Go back home if WebSocket connection is lost
        case WS_ERROR:
        case WS_DISCONNECTED:
            Actions.popTo('home');
            break;

        default:
            return result;
    }

    return result;
};

export default screenTransitionsMiddleware;
