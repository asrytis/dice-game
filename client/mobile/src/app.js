import React from 'React';
import { Scene, Router } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import wsMiddleware from './middleware/ws';
import sceneOnEnterMiddleware from './middleware/scene-on-enter';
import { fetchPlayers } from './actions/players-online';
import { color } from './styles/shared';
import reducers from './reducers';
import Home from './scenes/home';
import Setup from './scenes/setup';
import Game from './scenes/game';
import Help from './scenes/help';


const RouterWithRedux = connect()(Router);
const middleware = [thunkMiddleware, sceneOnEnterMiddleware, wsMiddleware];
const store = compose(applyMiddleware(...middleware))(createStore)(reducers);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux sceneStyle={{ backgroundColor: color.background }}>
                    <Scene key="root" hideNavBar={true}>
                        <Scene key="home" component={Home} onEnter={dispatch => dispatch(fetchPlayers())} />
                        <Scene key="setup" component={Setup} />
                        <Scene key="game" component={Game} type="replace" />
                        <Scene key="help" component={Help} direction="vertical" />
                    </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
};
