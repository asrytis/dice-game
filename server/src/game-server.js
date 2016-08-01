'use strict';

/**
 * The class maintains a list of game rooms and is responsible for allocating game rooms to players
 */
module.exports = class {

    /**
     * @param {GameRoom} roomClass
     */
    constructor({ roomClass, playersPerRoom }) {
        this._roomClass = roomClass;
        this._rooms = [];
        this._playersPerRoom = playersPerRoom;
    }

    /**
     * Finds an existing room or creates a brand new one
     * @return {GameRoom}
     */
    findAvailableRoom() {
        for (let room of this._rooms) {
            if (room.playerCount < this._playersPerRoom) {
                return room;
            }
        }

        const room = new this._roomClass();
        this._rooms.push(room);

        return room;
    }

    /**
     * Removes the room if there are no players registered
     * @param {GameRoom} room
     */
    removeRoomIfEmpty(room) {
        if (room.playerCount > 0) return;

        const index = this._rooms.indexOf(room);
        return index >= 0 && this._rooms.splice(index, 1);
    }

    /**
     * Active game rooms
     * @return {Number}
     */
    get roomCount() {
        return this._rooms.length;
    }

    /**
     * Active player count on the server
     * @return {Number}
     */
    get playerCount() {
        return this._rooms.reduce(
            (count, room) => count + room.playerCount,
            0
        );
    }

};