import { v4 } from 'node-uuid';

export interface PlayerOptions {
    ws: any,
    name: string
}

export interface PlayerSerialized {
    id: string,
    name: string
}

export default class Player {

    public id: string;
    public ws: any;
    public name: string;
    public room: any;

    constructor(options: PlayerOptions) {
        this.id = v4();
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

        return decodeURIComponent(name);
    }

}
