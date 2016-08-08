import GameState from './game-state';
import Player, { PlayerSerialized } from './player';
import * as actions from './actions';


export interface StateMap {
    [stateName: string]: GameState
}

export interface GameRoomOptions {
    maxPlayers: number;
    defaultState: string;
    stateFactory: (gameRoom: GameRoom) => StateMap;
}

export interface GameData {
    round: number;
    numberOfDice: number;
    score: {
        [playerId: number]: number[]
    };
}

export interface GameRoomSerialized {
    stateName: string;
    gameData: any
    players: PlayerSerialized[];
}

export interface Message {
    type: string;
    payload?: any;
}

/**
 * Responsible for keeping track of the players and relaying incoming messages to active game state
 */
export default class GameRoom {

    public maxPlayers: number;
    public players: Player[];
    public states: StateMap;
    public gameData: GameData;
    public state: GameState;
    public stateName: string;

    constructor(options: GameRoomOptions) {
        this.maxPlayers = options.maxPlayers;
        this.players = [];
        this.states = options.stateFactory(this);
        this.gameData = {
            round: 0,
            numberOfDice: 4,
            score: { }
        };
        this.state = null;
        this.stateName = '';
        this.setState(options.defaultState);
    }

    setState(stateName: string) {
        const newState: GameState = this.states[stateName];
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

    setGameData(gameData: GameData) {
        this.gameData = gameData;
        actions.gameDataChanged(this, gameData);
    }

    /**
     * @throws {Error} Will throw an error on attempts to add a new player when the room is full
     */
    addPlayer(player: Player) {
        if (!this.hasAvailableSlots) {
            throw new Error('The room is full');
        }

        player.room = this;
        this.players.push(player);
        
        actions.playerJoined(this, player);
        this.state.playerJoined(player);
    }

    removePlayer(player: Player) {
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
     * @return {Message|undefined}
     */
    parseMessage(message: string): Message {
        try {
            return JSON.parse(message);
        } catch (err) { }
    }

    processMessage(message: string, sender: Player) {
        const parsedMessage = this.parseMessage(message);

        if (parsedMessage) {
            this.state.processMessage(parsedMessage, sender);
        }
    }

    /**
     * Send message to all players in the room
     * @param {Player} [exclude] - this player will be skipped
     */
    broadcast(message: any, exclude?: Player) {
        const json = JSON.stringify(message);
        this.players.forEach(
            (player) => player !== exclude && player.ws.send(json)
        );
    }

    serialize(): GameRoomSerialized {
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
     */
    get hasAvailableSlots(): boolean {
        return this.playerCount < this.maxPlayers;
    }

    get playerCount(): number {
        return this.players.length;
    }

}
