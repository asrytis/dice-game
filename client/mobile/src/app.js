import React from 'React';
import { Scene, Router } from 'react-native-router-flux';
import Home from './components/home';
import Setup from './components/setup';
import Game from './components/game';
import Help from './components/help';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar={true}>
                    <Scene key="home" component={Home} />
                    <Scene key="setup" component={Setup} />
                    <Scene key="game" component={Game} type="replace" />
                    <Scene key="help" component={Help} direction="vertical" />
                </Scene>
            </Router>
        );
    }
};