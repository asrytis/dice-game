import { GAME_STATE_WAITING, GAME_STATE_READY, CMD_ROLL_DICE } from '../constants';
import { rollDice } from '../util';
import GameRoom, { Message } from '../game-room';
import Player from '../player';
import GameState from '../game-state';


/**
 * First player to roll the dice triggers a new round
 */
export default class InProgressState extends GameState {

    private timerID: NodeJS.Timer;

    enterState() {
        this.gameRoom.setGameData({
            round: this.gameRoom.gameData.round + 1,
            roundStarted: new Date().getTime(),
            score: {},
            winners: {}
        });
        this.timerID = setTimeout(() => this.roundFinished(), this.gameRoom.gameData.roundDuration);
    }

    playerLeft(player: Player) {
        super.playerLeft(player);

        if (this.gameRoom.playerCount < 2) {
            clearTimeout(this.timerID);
            this.gameRoom.setState(GAME_STATE_WAITING);
        } else {
            this.checkForRoundEnd();
        }
    }

    processMessage(message: Message, sender: Player) {
        if (message.type === CMD_ROLL_DICE) {

            const gameData = this.gameRoom.gameData;

            // Make sure the player cannot roll twice
            if (!gameData.score[sender.id]) {
                const score = Object.assign({}, gameData.score);
                score[sender.id] = rollDice(gameData.numberOfDice);

                this.gameRoom.setGameData({ score });
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

    determineTheWinners() {
        const score = this.gameRoom.gameData.score;
        const highestScore = Math.max.apply(null, Object.keys(score).map(id => score[id].value));
        
        let winners = {};
        for (var playerId in score) {
            winners[playerId] = score[playerId].value === highestScore;
        }

        this.gameRoom.setGameData({ winners });
    }

    roundFinished() {
        this.determineTheWinners();
        this.gameRoom.setState(GAME_STATE_READY);
    }

}
