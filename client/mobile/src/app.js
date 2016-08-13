import React from 'React';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import wsMiddleware from './middleware/ws';
import sceneOnEnterMiddleware from './middleware/scene-on-enter';
import serverActionsMiddleware from './middleware/server-actions';
import screenTransitionsMiddleware from './middleware/screen-transitions';
import reducers from './reducers/index';
import Routes from './routes';


const middleware = [thunkMiddleware, sceneOnEnterMiddleware, wsMiddleware, serverActionsMiddleware, screenTransitionsMiddleware];
const store = compose(applyMiddleware(...middleware))(createStore)(reducers);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Routes/>
            </Provider>
        );
    }
};
