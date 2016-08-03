'use strict';

const { GAME_STATE_READY } = require('../constants');
const { inRange, randomInRange } = require('../util');

/**
 * Waits for more players to join before transitioning to the READY state
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
    enterState() {
        this.checkPlayerCount();
    }

    /**
     * Invoked by the game room
     * @param {Player} player
     */
    playerAdded(player) {
        this.checkPlayerCount();
    }

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
    processMessage(message, sender) { }

    /**
     * Transition to the READY state if there are enough players
     */
    checkPlayerCount() {
        if (this.gameRoom.playerCount >= 2) {
            this.gameRoom.setState(GAME_STATE_READY);
        }
    }

};