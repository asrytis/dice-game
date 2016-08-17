# Multiplayer dice game

<img src="https://github.com/asrytis/dice-game/blob/master/docs/images/gameplay.png" align="right">

Hey there! This is my first public repo and a playground for React Native. I didn't want to litter the net with yet another Todo List app and decided to go with a simple game instead.

Developing a dice game was actually a programming task for a tech startup. The following were the original requirements:

- First user in the system selects the number of dice to roll (1-4)
- The game can begin when there are at least 2 users online
- They roll the dice (by clicking the button)
- The one with the greatest score wins
- If they want they can play again
- Dice are 6 sided (1-6)
- When one player rolls the dice others have up to 5 seconds to respond, otherwise they will lose
- The game is not limited to 2 players
- Backend: Python or Node
- Frontend: preferred: React.js + Redux, but you can use AngularJS too
 
Instead of hacking something together in a few hours I decided to walk that extra mile and do a proper graphical design + go with React Native instead of building a Web App.

## Installation

Type the following in terminal to install & run the server:

```
cd server
npm install && npm run start
```

To run the client, make sure you have React Native CLI installed:
```
npm install -g react-native-cli
```
Then run the following to install & run the app:
```
cd client/mobile
npm install && react-native run-ios
```

You will need to have at least 2 clients to be able to play. You can [run multiple simulators](http://stackoverflow.com/questions/26446346/xcode6-run-two-instances-of-the-simulator) or download the [tyrus-client-cli](https://repo1.maven.org/maven2/org/glassfish/tyrus/ext/tyrus-client-cli/1.1/tyrus-client-cli-1.1.jar) which I personally used while testing the game. The CLI is very easy to use:
```
java -jar tyrus-client-cli-1.1.jar ws://localhost:3000/ws
```

## Tech stack

### Server

* [Node JS](https://nodejs.org/) version 6 as a game server
* [TypeScript](https://www.typescriptlang.org/) to sleep better at night and enjoy code completion
* [Mocha](https://mochajs.org/) + [Chai](http://chaijs.com/) for TDD
* [tyrus-client-cli](https://repo1.maven.org/maven2/org/glassfish/tyrus/ext/tyrus-client-cli/1.1/tyrus-client-cli-1.1.jar) to test WebSocket connection from command line

### Client

* [React Native](https://facebook.github.io/react-native/)
* [Redux](https://github.com/reactjs/redux) to manage all the state
* [redux-create-reducer](https://github.com/kolodny/redux-create-reducer) to manage verbosity
* [redux-thunk](https://github.com/gaearon/redux-thunk)
* [react-native-animatable](https://github.com/oblador/react-native-animatable) an excellent library with all sorts of common use animations
* [react-native-router-flux](https://github.com/aksonov/react-native-router-flux) a React Native router that blends well with Redux
* [ESLint](http://eslint.org/) with [Airbnb's linting rules](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

## Server API

The basic idea is each websocket connection is treated as a new player. The server allocates players to virtual game rooms, 6 players per room. The game room itself is an implementation of a state machine pattern and transitions between setup, waiting, ready, and in-progress states based on various events.

### HTTP
To get the number of active players online make a GET request to [http://localhost:3000/api/player-count]

Example JSON response:
```
{
    "playerCount": 3
}
```

### WebSocket

Connect to the game server via the following URL:
ws://localhost:3000/ws?**player_name**

Player name is a string, for example "John Doe". If left blank, the server will generate a random name.

To keep things simple all the communication is done in JSON. Both incoming and outgoing messages conform to the following format:
```json
{
    "type": "<string>",
    "payload": "<any>"
}
```

#### Server sent messages

#### SV_GAME_STATE
Once joined, the player receives full game state along with a unique player ID. See typescript definition of [gameRoom](https://github.com/asrytis/dice-game/blob/master/server/src/game-room.ts#L35) and [gameData interface](https://github.com/asrytis/dice-game/blob/master/server/src/game-room.ts#L22) in source code.

```json
{
    "type": "SV_GAME_STATE",
    "payload": {
        "state": {
            "stateName": "GAME_STATE_SETUP",
            "gameData": {
                "round": 0,
                "roundDuration": 5000,
                "roundStarted": null,
                "numberOfDice": 0,
                "score": {},
                "winners": {}
            },
            "players": [
                {
                    "id": "342f36af-df53-4cb8-be56-ec00b6f80267",
                    "name": "Joe"
                }
            ]
        },
        "player": {
            "id": "342f36af-df53-4cb8-be56-ec00b6f80267",
            "name": "Joe"
        }
    }
}
```

#### SV_PLAYER_JOINED
New player has joined the game room.
```json
{
    "type": "SV_PLAYER_JOINED",
    "payload": {
        "id": "97013348-4960-4530-8634-9760a4d70582",
        "name": "Rytis"
    }
}
```

#### SV_PLAYER_LEFT
Player has left the game room.
```json
{
    "type": "SV_PLAYER_LEFT",
    "payload": {
        "id": "97013348-4960-4530-8634-9760a4d70582",
        "name": "Rytis"
    }
}
```

#### SV_GAME_STATE_CHANGED
Game state has changed. See the list of all game states below.
```json
{
    "type": "SV_GAME_STATE_CHANGED",
    "payload": "GAME_STATE_WAITING"
}
```

#### SV_GAME_DATA_CHANGED
You will receive this notification everytime game data changes. Current server timestamp will be included along with the data that changed (not necessarily be the full gameData object!). See response example of [SV_GAME_STATE](#sv_game_state) for a full list of gameData properties.
```json
{
    "type": "SV_GAME_DATA_CHANGED",
    "payload": {
        "serverTime": 1471437904627,
        "changes": {
            "round": 0,
            "roundStarted": null,
            "score": {},
            "winners": {}
        }
    }
}
```

### Client sent messages

#### CMD_SET_DICE
The first player to join a room will have to choose the number of dice to play with. An integer between 1 and 4 is expected. The server will only process the command if the game is in GAME_STATE_SETUP state and sender is the first player on the room players list.
```json
{
    "type": "CMD_SET_DICE",
    "payload": 4
}
```

#### CMD_ROLL_DICE
Rolls the dice! Works only if the game is in GAME_STATE_READY or GAME_STATE_IN_PROGRESS state.
```json
{
    "type": "CMD_ROLL_DICE"
}
```

### Game states
* **GAME_STATE_SETUP** - waiting for the host (first player on the list) to select number of dice to play with. If host leaves, the next player will become the host. If there are no other players, the room will be closed.
* **GAME_STATE_WAITING** - only 1 player in the room, waiting for at least 1 more to join
* **GAME_STATE_READY** - waiting for players to start the round
* **GAME_STATE_IN_PROGRESS** - round is in progress. Players have 5 seconds to roll the dice before the round ends.

## Contribution
There's always room for improvement and I am open to comments, suggestions, and PRs. I would love to see client implementations in other languages/frameworks! A CLI client would be awesome.

## Licence
MIT
