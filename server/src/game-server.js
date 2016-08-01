'use strict';

/**
 * The class is responsible for allocating players to rooms
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
        if (index !== -1) {
            this._players.splice(index, 1);
        }
    }

    /**
     * @param {Player} player
     * @param {String} message
     */
    processMessage(player, message) {

    }

    /**
     * Active player count on the server
     * @return {Number}
     */
    get playerCount() {
        return this._players.length;
    }

};