'use strict';

const { GAME_STATE_WAITING, GAME_STATE_READY, CMD_ROLL_DICE } = require('../constants');
const { randomInRange } = require('../util');

/**
 * First player to roll the dice triggers a new round
 */
module.exports = class {

    /**
     * @param {GameRoom} gameRoom
     */
    constructor(gameRoom) {
        this.gameRoom = gameRoom;
        this.timerID = null;
    }

    /**
     * Invoked by the game room when transitioning to this state
     */
    enterState() {
        this.timerID = setTimeout(() => this.roundFinished, 5000);
    }

    /**
     * Invoked by the game room
     * @param {Player} player
     */
    playerJoined(player) { }

    /**
     * Invoked by the game room
     * @param {Player} player
     */
    playerLeft(player) {
        delete gameData.score[player.id];

        if (this.gameRoom.playerCount < 2) {
            clearTimeout(this.timerID);
            this.gameRoom.setState(GAME_STATE_WAITING);
        }
    }

    /**
     * Invoked by the game room
     * @param {Object} message
     * @param {Player} sender
     */
    processMessage(message, sender) {
        if (message.type === CMD_ROLL_DICE) {

            const gameData = this.gameRoom.gameData;

            // Make sure the user cannot roll twice
            if (!gameData.score[sender.id]) {
                const newGameData = Object.assign({}, gameData);
                newGameData.score[sender.id] = Array(gameData.numberOfDice).fill(1).map(() => randomInRange(1, 6));

                this.gameRoom.setGameData(newGameData);

                // End the round if everyone's rolled the dice
                if (Object.keys(gameData.score).length === this.gameRoom.playerCount) {
                    clearTimeout(this.timerID);
                    this.roundFinished();
                }
            }
        }
    }

    /**
     * Transition back to the READY state
     */
    roundFinished() {
        this.gameRoom.setState(GAME_STATE_READY);
    }

};