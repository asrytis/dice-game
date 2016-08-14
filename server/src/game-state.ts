import GameRoom, { GameData, Message } from './game-room';
import Player from './player';


export default class GameState {

    constructor(protected gameRoom: GameRoom) { }
    
    enterState() { }

    playerJoined(player: Player) { }

    playerLeft(player: Player) {
        const score = Object.assign({}, this.gameRoom.gameData.score);
        delete score[player.id];

        const winners = Object.assign({}, this.gameRoom.gameData.winners);
        delete winners[player.id];

        this.gameRoom.setGameData({ score, winners });
    }

    processMessage(message: Message, sender: Player) { }
}
