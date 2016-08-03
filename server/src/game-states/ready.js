'use strict';

const { GAME_STATE_WAITING, GAME_STATE_IN_PROGRESS, CMD_ROLL_DICE } = require('../constants');
const { randomInRange } = require('../util');

/**
 * First player to roll the dice triggers a new round
 */
module.exports = class {

    /**
     * @param {gameRoom}
     */
    constructor(gameRoom) {
        this.gameRoom = gameRoom;
    }

    /**
     * Invoked by the game room when transitioning to this state
     */
    enterState() { }

    /**
     * Invoked by the game room
     * @param {Player} player
     */
    playerAdded(player) { }

    /**
     * Invoked by the game room
     * @param {Player} player
     */
    playerRemoved(player) {
        delete gameData.score[player.id];
        
        if (this.gameRoom.playerCount < 2) {
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

            gameData.round++;
            gameData.score = {
                [sender.id]: Array(gameData.numberOfDice).fill(1).map(() => randomInRange(1, 6))
            };

            this.gameRoom.setState(GAME_STATE_IN_PROGRESS);
        }
    }

};