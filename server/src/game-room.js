'use strict';

const {
    GAME_STATE_SETUP,
    GAME_STATE_WAITING,
    GAME_STATE_READY,
    GAME_STATE_IN_PROGRESS
} = require('./constants');

const SetupState = require('./game-states/setup');
const WaitingState = require('./game-states/waiting');
const ReadyState = require('./game-states/ready');
const InProgressState = require('./game-states/in-progress');

/**
 * Responsible for keeping track of the players and relaying incoming messages to active game state
 */
module.exports = class {

    constructor() {
        this._players = [];
        this._states = {
            [GAME_STATE_SETUP]: new SetupState(this),
            [GAME_STATE_WAITING]: new WaitingState(this),
            [GAME_STATE_READY]: new ReadyState(this),
            [GAME_STATE_IN_PROGRESS]: new InProgressState(this)
        };
        this.gameData = {
            round: 0,
            numberOfDice: 4,
            score: { }
        };
        this.state = null;
        this.setState(GAME_STATE_SETUP);
    }

    /**
     * @param {String} newState
     */
    setState(newState) {
        if (this.state === newState) {
            return;
        }
        
        const state = this._states[newState];
        if (state) {
            this.state = state;
            this.state.enterState();
        }
    }

    /**
     * @param {Player} player
     */
    addPlayer(player) {
        player.room = this;
        this._players.push(player);
        this.state.playerAdded(player);
    }

    /**
     * @param {Player} player
     */
    removePlayer(player) {
        const index = this._players.indexOf(player);
        if (index >= 0) {
            player.room = null;
            this._players.splice(index, 1);
            this.state.playerRemoved(player);
        }
    }

    /**
     * Parse a message coming from the client
     * @param {String} message
     * @return {Object|null}
     */
    parseMessage(message) {
        try {
            return JSON.parse(message);
        } catch (err) {
            return null;
        }
    }

    /**
     * @param {String} message
     * @param {Player} sender
     */
    processMessage(message, sender) {
        const parsedMessage = this.parseMessage(message);

        if (parsedMessage) {
            this.state.processMessage(parsedMessage, sender);
        }
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