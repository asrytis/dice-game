import { GAME_STATE_READY } from '../constants';
import { inRange, randomInRange } from '../util';
import GameRoom from '../game-room';
import Player from '../player';
import GameState from '../game-state';


/**
 * Waits for more players to join before transitioning to the READY state
 */
export default class WaitingState extends GameState {

    enterState() {
        this.checkIfEnoughPlayers();
    }

    playerJoined(player) {
        this.checkIfEnoughPlayers();
    }

    /**
     * Transition to the READY state once there are enough players in the room
     */
    checkIfEnoughPlayers() {
        if (this.gameRoom.playerCount >= 2) {
            this.gameRoom.setState(GAME_STATE_READY);
        }
    }

}