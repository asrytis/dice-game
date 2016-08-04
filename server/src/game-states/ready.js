'use strict';

const { GAME_STATE_WAITING, GAME_STATE_IN_PROGRESS, CMD_ROLL_DICE } = require('../constants');
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
    }

    /**
     * Invoked by the game room when transitioning to this state
     */
    enterState() { }

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

            this.gameRoom.setGameData({
                round: gameData.round + 1,
                score: {
                    [sender.id]: Array(gameData.numberOfDice).fill(1).map(() => randomInRange(1, 6))
                }
            });
            
            this.gameRoom.setState(GAME_STATE_IN_PROGRESS);
        }
    }

};