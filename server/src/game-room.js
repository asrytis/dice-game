'use strict';

const {
    GAME_STATE_SETUP,
    GAME_STATE_WAITING,
    GAME_STATE_READY,
    GAME_STATE_IN_PROGRESS
} = require('./constants');
const actions = require('./actions');
const SetupState = require('./game-states/setup');
const WaitingState = require('./game-states/waiting');
const ReadyState = require('./game-states/ready');
const InProgressState = require('./game-states/in-progress');


/**
 * Responsible for keeping track of the players and relaying incoming messages to active game state
 */
module.exports = class {

    /**
     * @param {Number} maxPlayers
     */
    constructor({ maxPlayers }) {
        this.maxPlayers = maxPlayers;
        this.players = [];
        this.states = {
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
        this.stateName = '';
        this.setState(GAME_STATE_SETUP);
    }

    /**
     * @param {String} stateName
     */
    setState(stateName) {
        const newState = this.states[stateName];
        if (this.state === newState) {
            return;
        }
        
        if (newState) {
            this.stateName = stateName;
            this.state = newState;

            actions.gameStateChanged(this, stateName);
            this.state.enterState();
        }
    }

    /**
     * @param {Object} gameData
     */
    setGameData(gameData) {
        this.gameData = gameData;
        actions.gameDataChanged(this, gameData);
    }

    /**
     * @throws {Error} Will throw an error on attempts to add a new player when the room is full
     * @param {Player} player
     */
    addPlayer(player) {
        if (!this.hasAvailableSlots) {
            throw new Error('The room is full');
        }

        player.room = this;
        this.players.push(player);
        
        actions.playerJoined(this, player);
        this.state.playerJoined(player);
    }

    /**
     * @param {Player} player
     */
    removePlayer(player) {
        const index = this.players.indexOf(player);
        if (index >= 0) {
            player.room = null;
            this.players.splice(index, 1);
            actions.playerLeft(this, player);
            this.state.playerLeft(player);
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
     * @param {Player} [exclude] - this player will be skipped
     */
    broadcast(message, exclude) {
        const json = JSON.stringify(message);
        this.players.forEach(
            (player) => player !== exclude && player.ws.send(json)
        );
    }

    /**
     * Serialize the full game state
     * @return {Object}
     */
    serialize() {
        return {
            stateName: this.stateName,
            gameData: this.gameData,
            players: this.players.map(
                (player) => player.serialize()
            )
        };
    }

    /**
     * Checks if a new player can be added to the room
     * @return {Boolean}
     */
    get hasAvailableSlots() {
        return this.playerCount < this.maxPlayers;
    }

    /**
     * @return {Number}
     */
    get playerCount() {
        return this.players.length;
    }

};