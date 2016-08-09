import React from 'react';
import { Text, View } from 'react-native';
import Background from './background';
import Button from './button';
import Player from './player';
import styles from '../styles/game';


export default class Setup extends React.Component {

    constructor(props) {
        super(props);

        this.onOptionSelect = this.onOptionSelect.bind(this);
        this.state = {
            isConnecting: false
        };
    }
    
    onOptionSelect() {
        this.setState({...this.state, isConnecting: true });
        setTimeout(() => this.setState({...this.state, isConnecting: false }), 2000);
    }

    renderHeaderText() {
        return <Text style={styles.text}>Waiting for more players to join ...</Text>;
    }

    renderHeaderProgress() {
        return (
            <View style={styles.roundProgressContainer}>
                <Text style={styles.text}>Round</Text>
                <Text style={styles.title}>6</Text>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: 70 }]}/>
                </View>
            </View>
        );
    }

    render() {
        const buttonDisabled = false;
        const headerContent = this.renderHeaderProgress();

        return (
            <Background>
                <View style={styles.navbar}>
                    <Button style={styles.navbarButton} textStyle={styles.navbarButtonText} onPress={() => {}}>&lt; Home</Button>
                    <Button style={styles.navbarButtonRight} textStyle={styles.navbarButtonText} onPress={() => {}}>Help</Button>
                </View>
                <View style={styles.header}>
                    {headerContent}
                </View>

                <View style={styles.playersContainer}>
                    <Player/>
                    <Player/>
                    <Player/>
                    <Player/>
                    <Player/>
                    <Player/>
                </View>

                <View style={styles.buttonContainer}>
                    <Button style={styles.button} textStyle={styles.buttonText} disabled={buttonDisabled}>ROLL THE DICE</Button>
                </View>
            </Background>
        );
    }
}
