import React from 'React';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { color } from './styles/shared';
import { wsDisconnect } from './actions/ws';
import { fetchPlayers } from './actions/players-online';
import Home from './scenes/home';
import GameSetup from './scenes/game-setup';
import Game from './scenes/game';
import Help from './scenes/help';

function homeOnEnter(dispatch) {
    dispatch(wsDisconnect());
    setTimeout(() => dispatch(fetchPlayers()), 300);
}

const RouterWithRedux = connect()(Router);

export default function Routes() {
    return (
        <RouterWithRedux sceneStyle={{ backgroundColor: color.background }}>
            <Scene key="root" hideNavBar={true}>
                <Scene key="home" component={Home} onEnter={homeOnEnter} />
                <Scene key="game-setup" component={GameSetup} />
                <Scene key="game" component={Game} />
                <Scene key="help" component={Help} direction="vertical" />
            </Scene>
        </RouterWithRedux>
    );
}
