'use strict';

const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
const Player = require('../../src/player');
const SetupState = require('../../src/game-states/setup');
const { GAME_STATE_WAITING, CMD_SET_DICE } = require('../../src/constants');


chai.use(spies);


describe('SetupState', function() {

    it('should proceed to the WAITING state after user has picked number of dice to play with', function() {
        const player1 = new Player({ ws: {}, name: 'Player 1' });
        const gameRoomMock = {
            players: [player1],
            gameData: {},
            setState: function(){ }
        };

        chai.spy.on(gameRoomMock, 'setState');

        const state = new SetupState(gameRoomMock);
        state.processMessage({ type: CMD_SET_DICE, data: 3 }, player1);
        
        expect(gameRoomMock.gameData.numberOfDice).to.equal(3);
        expect(gameRoomMock.setState).to.have.been.called.with.exactly(GAME_STATE_WAITING);
    });

});