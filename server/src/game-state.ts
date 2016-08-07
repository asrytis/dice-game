import GameRoom, { GameData } from './game-room';
import Player from './player';


export default class GameState {

    constructor(protected gameRoom: GameRoom) { }
    
    enterState() { }
    playerJoined(player: Player) { }
    playerLeft(player: Player) { }
    processMessage(message: any, sender: Player) { }
}
