import GameRoom, { GameData } from './game-room';
import Player from './player';
import { SV_GAME_STATE, SV_PLAYER_JOINED, SV_PLAYER_LEFT, SV_GAME_STATE_CHANGED, SV_GAME_DATA_CHANGED } from './constants';


export function playerJoined(gameRoom: GameRoom, player: Player) {
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
}

export function playerLeft(gameRoom: GameRoom, player: Player) {
    gameRoom.broadcast({
        type: SV_PLAYER_LEFT,
        payload: player.serialize()
    }, player);
}

export function gameStateChanged(gameRoom: GameRoom, newState: string) {
    gameRoom.broadcast({
        type: SV_GAME_STATE_CHANGED,
        payload: newState
    });
}

export function gameDataChanged(gameRoom: GameRoom, changes: GameData) {
    gameRoom.broadcast({
        type: SV_GAME_DATA_CHANGED,
        payload: {
            serverTime: new Date().getTime(),
            changes
        }
    });
}
