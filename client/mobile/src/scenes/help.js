import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Text } from 'react-native';
import Background from '../components/background';
import Button from '../components/button';
import styles from '../styles/help';

export default function Help() {
    return (
        <Background>
            <Text style={styles.title}>Game rules</Text>
            <Text style={styles.paragraph}>
                The goal of the game is to get the highest score in round.
            </Text>
            <Text style={styles.paragraph}>
                First player to roll the dice starts the round.
                Others will then have to roll their dice in 5 seconds before the round ends.
            </Text>
            <Text style={styles.paragraph}>Have fun!</Text>
            <Button style={styles.button} onPress={Actions.pop}>CLOSE</Button>
        </Background>
    );
}
