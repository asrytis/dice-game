'use strict';

/**
 * The class maintains a list of game rooms and is responsible for allocating game rooms to players
 */
module.exports = class {

    /**
     * @param {GameRoom} roomClass
     */
    constructor({ roomClass, playersPerRoom }) {
        this.roomClass = roomClass;
        this.rooms = [];
        this.playersPerRoom = playersPerRoom;
    }

    /**
     * Finds an existing room or creates a brand new one
     * @return {GameRoom}
     */
    findAvailableRoom() {
        for (let room of this.rooms) {
            if (room.playerCount < this.playersPerRoom) {
                return room;
            }
        }

        const room = new this.roomClass();
        this.rooms.push(room);

        return room;
    }

    /**
     * Removes the room if there are no players registered
     * @param {GameRoom} room
     */
    removeRoomIfEmpty(room) {
        if (room.playerCount > 0) return;

        const index = this.rooms.indexOf(room);
        return index >= 0 && this.rooms.splice(index, 1);
    }

    /**
     * Active game rooms
     * @return {Number}
     */
    get roomCount() {
        return this.rooms.length;
    }

    /**
     * Active player count on the server
     * @return {Number}
     */
    get playerCount() {
        return this.rooms.reduce(
            (count, room) => count + room.playerCount,
            0
        );
    }

};