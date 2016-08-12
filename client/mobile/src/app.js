import React from 'React';
import { Scene, Router } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchPlayers } from './actions/players-online';
import wsMiddleware from './middleware/ws';
import sceneOnEnterMiddleware from './middleware/scene-on-enter';
import { color } from './styles/shared';
import Home from './components/home';
import Setup from './components/setup';
import Game from './components/game';
import Help from './components/help';
import reducers from './reducers';


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
