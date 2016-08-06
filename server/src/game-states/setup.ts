import { GAME_STATE_WAITING, CMD_SET_DICE } from '../constants';
import { inRange } from '../util';
import GameRoom from '../game-room';
import Player from '../player';
import GameState from '../game-state';


/**
 * Waits for the player to select the amount of dice to play with. Transitions to the WAITING state afterwards
 */
export default class SetupState extends GameState {

    processMessage(message, sender) {
        // Make sure it's coming from the host
        if (sender !== this.gameRoom.players[0]) {
            return;
        }

        if (message.type === CMD_SET_DICE) {
            const numberOfDice = parseInt(message.payload, 10);
            
            if (inRange(numberOfDice, 1, 4)) {
                this.gameRoom.setGameData({
                    round: 0,
                    numberOfDice,
                    score: { }
                });
                this.gameRoom.setState(GAME_STATE_WAITING);
            }
        }
    }

}