let PLAYER_ID: number = 0;

export interface PlayerOptions {
    ws: any,
    name: string
}

export interface PlayerSerialized {
    id: number,
    name: string
}

export default class Player {

    public id: number;
    public ws: any;
    public name: string;
    public room: any;

    constructor(options: PlayerOptions) {
        this.id = ++PLAYER_ID;
        this.ws = options.ws;
        this.name = options.name;
    }

    serialize(): PlayerSerialized {
        return {
            id: this.id,
            name: this.name
        };
    }

    /**
     * Extracts name from the URL or returns a random one if none is found in URL
     * @param {string} url - example: "/ws?Rytis"
     * @param {number} [charLimit] - max characters to read from URL
     */
    static extractName(url: string, charLimit?: number): string {
        const index = url.lastIndexOf('?');
        const name = index >= 0 ? url.substr(index+1, charLimit) : '';
        
        if (name.length === 0) {
            return 'Anonymous ' + Math.round(Math.random() * 1000);
        }

        return name;
    }

}
