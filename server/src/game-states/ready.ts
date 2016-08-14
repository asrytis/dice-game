import { GAME_STATE_WAITING, GAME_STATE_IN_PROGRESS, CMD_ROLL_DICE } from '../constants';
import { rollDice } from '../util';
import GameRoom, { Message } from '../game-room';
import Player from '../player';
import GameState from '../game-state';


/**
 * First player to roll the dice triggers a new round
 */
export default class ReadyState extends GameState {

    enterState() {
        this.gameRoom.setGameData({ roundStarted: null });
    }

    playerLeft(player: Player) {
        super.playerLeft(player);
        
        if (this.gameRoom.playerCount < 2) {
            this.gameRoom.setState(GAME_STATE_WAITING);
        }
    }

    processMessage(message: Message, sender: Player) {
        if (message.type === CMD_ROLL_DICE) {
            this.gameRoom.setState(GAME_STATE_IN_PROGRESS);
            this.gameRoom.state.processMessage(message, sender);
        }
    }

}
