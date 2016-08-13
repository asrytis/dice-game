import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';
import autobind from 'autobind-decorator';
import {
    cmdRollDice,
    GAME_STATE_SETUP,
    GAME_STATE_WAITING,
    GAME_STATE_READY,
    GAME_STATE_IN_PROGRESS
} from '../actions/game';
import Background from '../components/background';
import Button from '../components/button';
import Player from '../components/player';
import styles from '../styles/game';

@connect(
    ({ player, game }) => ({ player, game }),
    { cmdRollDice }
)
export default class Game extends React.Component {

    @autobind
    rollDice() {
        this.props.cmdRollDice();
    }

    isButtonDisabled() {
        const { player, game } = this.props;
        
        // Round not started yet
        if ([GAME_STATE_SETUP, GAME_STATE_WAITING].includes(game.stateName)) {
            return true;
        }

        // Player has already rolled
        if (game.stateName === GAME_STATE_IN_PROGRESS && game.gameData.score[player.id]) {
            return true;
        }

        return false;
    }

    renderHeaderText() {
        return <Text style={styles.text}>Waiting for more players to join ...</Text>;
    }

    renderHeaderProgress(game) {
        if (game.stateName === GAME_STATE_SETUP) {
            return <Text style={styles.text}>Waiting for other player to setup the game</Text>;
        }

        if (game.stateName === GAME_STATE_WAITING) {
            return <Text style={styles.text}>Waiting for other players to join</Text>;
        }

        if (game.stateName === GAME_STATE_READY) {
            return <Text style={styles.text}>Roll the dice to start the round</Text>
        }

        return (
            <View style={styles.roundProgressContainer}>
                <Text style={styles.text}>Round</Text>
                <Text style={styles.title}>{game.gameData.round}</Text>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: 70 }]}/>
                </View>
            </View>
        );
    }

    render() {
        const { player: user, game } = this.props;
        const headerContent = this.renderHeaderProgress(game);

        return (
            <Background>
                <View style={styles.navbar}>
                    <Button style={styles.navbarButton} textStyle={styles.navbarButtonText} onPress={() => Actions.popTo('home')}>&lt; Home</Button>
                    <Button style={styles.navbarButtonRight} textStyle={styles.navbarButtonText} onPress={Actions.help}>Help</Button>
                </View>
                <View style={styles.header}>
                    {headerContent}
                </View>

                <View style={styles.playersContainer}>
                    {game.players.map(player => (
                        <Player
                            key={player.id}
                            name={player.name}
                            isUser={player.id === user.id}
                            slots={game.gameData.numberOfDice}
                            dice={game.gameData.score[player.id]}
                            score={null}
                            isWinner={false}
                        />
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <Button style={styles.button} textStyle={styles.buttonText} disabled={this.isButtonDisabled()} onPress={this.rollDice}>ROLL THE DICE</Button>
                </View>
            </Background>
        );
    }
}
