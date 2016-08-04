'use strict';

let PLAYER_ID = 0;

module.exports = class Player {

    /**
     * @param {WebSocket} ws
     * @param {String} name
     */
    constructor({ ws, name }) {
        this.id = ++PLAYER_ID;
        this.ws = ws;
        this.name = name;
        this.room = null;
    }

    /**
     * @return {Object}
     */
    serialize() {
        return {
            id: this.id,
            name: this.name
        };
    }

    /**
     * Extracts name from the URL or returns a random one if none is found in URL
     * @param {String} url - example "/ws?Rytis"
     * @param {Number} maxLength
     * @return {String}
     */
    static extractName(url, maxLength) {
        const index = url.lastIndexOf('?');
        const name = index >= 0 ? url.substr(index+1, maxLength) : '';
        
        if (name.length === 0) {
            return 'Anonymous ' + Math.round(Math.random() * 1000);
        }

        return name;
    }

};