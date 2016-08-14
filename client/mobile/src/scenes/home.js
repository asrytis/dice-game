import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TextInput } from 'react-native';
import autobind from 'autobind-decorator';
import { wsConnect } from '../actions/ws';
import { playerSetName } from '../actions/player';
import { color } from '../styles/shared';
import styles from '../styles/home';
import Background from '../components/background';
import Button from '../components/button';

@connect(
    ({ routes, playersOnline, ws, player }) => ({ routes, playersOnline, ws, player }),
    { wsConnect, playerSetName }
)
export default class Home extends React.Component {

    @autobind
    onSubmit() {
        this.props.wsConnect(`ws://localhost:3000/ws?${this.props.player.name}`);
    }

    render() {
        const { playersOnline, ws, player, playerSetName } = this.props;
        const feedbackText = ws.isConnecting ? 'Connecting ...' : ws.error;
        const playersOnlineText = playersOnline.error || `${playersOnline.value} players online`;
        
        return (
            <Background>
                <Text style={styles.title}>Dice game</Text>
                <Image source={require('../assets/images/separator-line.png')} style={styles.separatorLine} />
                <View style={[styles.textInputContainer, ws.isConnecting ? styles.disabled : null]}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={color.light2}
                        maxLength={15}
                        placeholder="Player name"
                        value={player.name}
                        onChangeText={name => playerSetName(name)}
                        onSubmitEditing={this.onSubmit}
                    />
                    <Button style={styles.button} disabled={ws.isConnecting} onPress={this.onSubmit}>GO</Button>
                </View>
                <Text style={styles.feedbackText}>{feedbackText}</Text>
                <Text style={styles.playersOnline}>{playersOnlineText}</Text>
            </Background>
        );
    }
}
