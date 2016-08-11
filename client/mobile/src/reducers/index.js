import { combineReducers } from 'redux';
import routes from './routes';
import playersOnline from './players-online';

export default combineReducers({
    routes,
    playersOnline
});
