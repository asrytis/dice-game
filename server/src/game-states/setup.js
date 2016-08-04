'use strict';

const { GAME_STATE_WAITING, CMD_SET_DICE } = require('../constants');
const { inRange } = require('../util');

/**
 * Waits for the player to select the amount of dice to play with. Transitions to the WAITING state afterwards
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
    playerAdded(player) { }

    /**
     * Invoked by the game room
     * @param {Player} player
     */
    playerRemoved(player) { }

    /**
     * Invoked by the game room
     * @param {Object} message
     * @param {Player} sender
     */
    processMessage(message, sender) {
        // Make sure it's coming from the host
        if (sender !== this.gameRoom.players[0]) {
            return;
        }

        if (message.type === CMD_SET_DICE) {
            const numberOfDice = parseInt(message.data, 10);
            
            if (inRange(numberOfDice, 1, 4)) {
                this.gameRoom.gameData.numberOfDice = numberOfDice;
                this.gameRoom.setState(GAME_STATE_WAITING);
            }
        }
    }

};