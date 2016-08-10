import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, Image, TextInput } from 'react-native';
import { color } from '../styles/shared';
import styles from '../styles/home';
import Background from './background';
import Button from './button';


export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            isLoadingPlayerCount: false,
            playerCount: 0,
            isConnecting: false
        };
    }
    
    componentWillMount() {
        this.setState({ isLoadingPlayerCount: true });
        setTimeout(() => this.setState({ isLoadingPlayerCount: false, playerCount: 3 }), 3000);
    }

    onSubmit() {
        this.setState({ isConnecting: true });
        setTimeout(() => {
            this.setState({ isConnecting: false });
            Actions.setup();
        }, 2000);
    }

    render() {
        const { isConnecting, isLoadingPlayerCount, playerCount } = this.state;
        const feedbackText = isConnecting ? 'Connecting ...' : '';
        const playersOnlineText = isLoadingPlayerCount ? '' : `${playerCount} players online`;
        
        return (
            <Background>
                <Text style={styles.title}>Dice game</Text>
                <Image source={require('../assets/images/separator-line.png')} style={styles.separatorLine} />
                <View style={[styles.textInputContainer, this.state.isConnecting ? styles.disabled : {}]}>
                    <TextInput style={styles.textInput} maxLength={15} placeholder="Player name" placeholderTextColor={color.light2} />
                    <Button style={styles.button} disabled={this.state.isConnecting} onPress={this.onSubmit}>GO</Button>
                </View>
                <Text style={styles.feedbackText}>{feedbackText}</Text>
                <Text style={styles.playersOnline}>{playersOnlineText}</Text>
            </Background>
        );
    }
}
