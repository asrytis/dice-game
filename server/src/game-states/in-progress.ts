import { GAME_STATE_WAITING, GAME_STATE_READY, CMD_ROLL_DICE } from '../constants';
import { randomInRange } from '../util';
import GameRoom from '../game-room';
import Player from '../player';
import GameState from '../game-state';


/**
 * First player to roll the dice triggers a new round
 */
export default class InProgressState extends GameState {

    private timerID: NodeJS.Timer;

    constructor(gameRoom: GameRoom, private roundDuration = 5000) {
        super(gameRoom);
    }

    enterState() {
        this.timerID = setTimeout(() => this.roundFinished, this.roundDuration);
    }

    playerLeft(player: Player) {
        const newGameData = Object.assign({}, this.gameRoom.gameData);
        delete newGameData.score[player.id];
        
        this.gameRoom.setGameData(newGameData);

        if (this.gameRoom.playerCount < 2) {
            clearTimeout(this.timerID);
            this.gameRoom.setState(GAME_STATE_WAITING);
        } else {
            this.checkForRoundEnd();
        }
    }

    processMessage(message: any, sender: Player) {
        if (message.type === CMD_ROLL_DICE) {

            const gameData = this.gameRoom.gameData;

            // Make sure the player cannot roll twice
            if (!gameData.score[sender.id]) {
                const newGameData = Object.assign({}, gameData);
                newGameData.score[sender.id] = Array(newGameData.numberOfDice).fill(1).map(() => randomInRange(1, 6));

                this.gameRoom.setGameData(newGameData);
                this.checkForRoundEnd();
            }
        }
    }

    /**
     * End the round if everyone's rolled the dice
     */
    checkForRoundEnd() {
        if (Object.keys(this.gameRoom.gameData.score).length === this.gameRoom.playerCount) {
            clearTimeout(this.timerID);
            this.roundFinished();
        }
    }

    /**
     * Transition back to the READY state
     */
    roundFinished() {
        this.gameRoom.setState(GAME_STATE_READY);
    }

}
