import GameRoom, { GameData, Message } from './game-room';
import Player from './player';


export default class GameState {

    constructor(protected gameRoom: GameRoom) { }
    
    enterState() { }
    playerJoined(player: Player) { }
    playerLeft(player: Player) { }
    processMessage(message: Message, sender: Player) { }
}
