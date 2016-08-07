import Player from '../../src/player';


export class WebSocketMock {
    send() { }
}

export const createPlayer = (name: string) => new Player({ ws: new WebSocketMock(), name });
