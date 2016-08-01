'use strict';

/**
 *  Responsible for keeping track of the players and managing incoming and outgoing messages
 */
module.exports = class {

    constructor() {
        this._players = [];
    }

    /**
     * @param {Player} player
     */
    addPlayer(player) {
        this._players.push(player);
    }

    /**
     * @param {Player} player
     */
    removePlayer(player) {
        const index = this._players.indexOf(player);
        if (index >= 0) {
            this._players.splice(index, 1);
        }
    }

    /**
     * @param {Object} message
     * @param {Player} sender
     */
    processMessage(message, sender) {

    }

    /**
     * Send message to all players in the room
     * @param {Object} message
     */
    broadcast(message) {
    	this._players.forEach(
    		(player) => player.ws.send(message)
    	);
    }

    /**
     * @return {Number}
     */
    get playerCount() {
        return this._players.length;
    }

};