const {
    SV_GAME_STATE,
    SV_PLAYER_JOINED,
    SV_PLAYER_LEFT,
    SV_GAME_STATE_CHANGED,
    SV_GAME_DATA_CHANGED
} = require('./constants');


/**
 * Updating players with server side events
 */
module.exports = {

    /**
     * @param {GameRoom} gameRoom
     * @param {Player} player
     */
    playerJoined(gameRoom, player) {
        gameRoom.broadcast({
            type: SV_PLAYER_JOINED,
            payload: player.serialize()
        }, player);

        player.ws.send(JSON.stringify({
            type: SV_GAME_STATE,
            payload: {
                state: gameRoom.serialize(),
                player: player.serialize()
            }
        }));
    },

    /**
     * @param {GameRoom} gameRoom
     * @param {Player} player
     */
    playerLeft(gameRoom, player) {
        gameRoom.broadcast({
            type: SV_PLAYER_JOINED,
            payload: player.serialize()
        }, player);
    },

    /**
     * @param {GameRoom} gameRoom
     * @param {String} newState
     */
    gameStateChanged(gameRoom, newState) {
        gameRoom.broadcast({
            type: SV_GAME_STATE_CHANGED,
            payload: newState
        });
    },

    /**
     * @param {GameRoom} gameRoom
     * @param {Object} gameData
     */
    gameDataChanged(gameRoom, gameData) {
        gameRoom.broadcast({
            type: SV_GAME_DATA_CHANGED,
            payload: gameData
        });
    }

};