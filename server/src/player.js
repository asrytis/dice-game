'use strict';

module.exports = class Player {

	/**
	 * @param {WebSocket} ws
	 * @param {String} name
	 */
	constructor({ ws, name }) {
		this.ws = ws;
		this.name = name;
		this.room = null;
	}

	/**
	 * Extracts name from the URL or returns a random one if none is found in URL
	 * @param {String} url - example "/ws?Rytis"
	 * @param {Number} maxLength
	 * @return {String}
	 */
	static extractName(url, maxLength) {
		const index = url.lastIndexOf('?');
		const name = index >= 0 ? url.substr(index+1, maxLength) : '';
		
		if (name.length === 0) {
			return 'Anonymous ' + Math.round(Math.random() * 1000);
		}

		return name;
	}

};