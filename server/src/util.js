'use strict';

module.exports = {
	/**
	 * Checks if value is within the given range inclusively
	 * @param {Number} value
	 * @param {Number} min
	 * @param {Number} max
	 * @return {Boolean}
	 */
	inRange: (value, min, max) => value >= min && value <= max,

	/**
	 * Generates a random integer within the given range inclusively
	 * @param {Number} min
	 * @param {Number} max
	 * @return {Number}
	 */
	randomInRange: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
};