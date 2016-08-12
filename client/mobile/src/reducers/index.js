import { combineReducers } from 'redux';
import routes from './routes';
import playersOnline from './players-online';
import ws from './ws';

export default combineReducers({
    routes,
    playersOnline,
    ws
});
