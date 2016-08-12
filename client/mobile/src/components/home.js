import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TextInput } from 'react-native';
import autobind from 'autobind-decorator';
import { wsConnect } from '../actions/ws';
import { color } from '../styles/shared';
import styles from '../styles/home';
import Background from './background';
import Button from './button';


const mapStateToProps = ({ routes, playersOnline, ws }) => ({ routes, playersOnline, ws });
const mapDispatchToProps = { wsConnect };

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playerName: ''
        };
    }

    @autobind
    onSubmit() {
        this.props.wsConnect(`ws://localhost:3000/ws?${this.state.playerName}`);
    }

    render() {
        const { playersOnline, ws } = this.props;
        const feedbackText = ws.isConnecting ? 'Connecting ...' : '';
        const playersOnlineText = (playersOnline.isFetching || playersOnline.error) ? '' : `${playersOnline.value} players online`;
        
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
                        value={this.state.playerName}
                        onChangeText={playerName => this.setState({ playerName })}
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
