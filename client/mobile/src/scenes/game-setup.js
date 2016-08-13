import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';
import { cmdSetDice } from '../actions/game';
import Background from '../components/background';
import Button from '../components/button';
import styles from '../styles/setup';

@connect(null, { cmdSetDice })
export default class GameSetup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isConnecting: false
        };
    }
    
    onOptionSelect(index) {
        this.props.cmdSetDice(index + 1);
        this.setState({ isConnecting: true });
    }

    render() {
        const { isConnecting } = this.state;
        const options = ['1 DICE', '2 DICE', '3 DICE', '4 DICE'];
        const feedbackText = isConnecting ? 'Connecting ...' : '';

        return (
            <Background>
                <View style={styles.navbar}>
                    <Button style={styles.navbarButton} textStyle={styles.navbarButtonText} onPress={() => Actions.popTo('home')}>&lt; Home</Button>
                </View>
                <Text style={styles.title}>Game setup</Text>
                <Text style={styles.instructions}>You’re the first player to join the table!
Please select the number of dice to roll:</Text>
                <View style={[styles.buttonGroup, this.state.isConnecting ? styles.disabled : null]}>
                    {options.map((label, index) => (
                        <Button key={index} style={styles.button} disabled={isConnecting} onPress={() => this.onOptionSelect(index)}>{label}</Button>
                    ))}
                </View>
                <Text style={styles.feedbackText}>{feedbackText}</Text>
            </Background>
        );
    }
}
