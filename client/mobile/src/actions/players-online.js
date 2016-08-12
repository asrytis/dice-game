export const PLAYERS_REQUEST = 'PLAYERS_ONLINE_REQUEST';
export const PLAYERS_REQUEST_SUCCESS = 'PLAYERS_ONLINE_REQUEST_SUCCESS';
export const PLAYERS_REQUEST_FAILURE = 'PLAYERS_ONLINE_REQUEST_FAILURE';

const playersRequest = () => ({ type: PLAYERS_REQUEST });
const playersRequestSuccess = playerCount => ({ type: PLAYERS_REQUEST_SUCCESS, payload: playerCount });
const playersRequestFailure = error => ({ type: PLAYERS_REQUEST_FAILURE, payload: error });

export const fetchPlayers = () => (dispatch, getState) => {
    dispatch(playersRequest());

    return fetch('http://localhost:3000/api/player-count')
        .then(response => response.json())
        .then(json => dispatch(playersRequestSuccess(json.playerCount)))
        .catch(error => dispatch(playersRequestFailure(error.message)));
};
