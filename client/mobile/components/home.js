import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StatusBar,
    TouchableHighlight
} from 'react-native';
import { color } from '../styles/shared';
import styles from '../styles/home';


export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadingPlayerCount: false,
            playerCount: 0,
            isConnecting: false
        };
    }
    
    componentWillMount() {
        this.setState({...this.state, isLoadingPlayerCount: true });
        setTimeout(() => this.setState({...this.state, isLoadingPlayerCount: false, playerCount: 3 }), 3000);
    }

    onSubmit() {
        this.setState({...this.state, isConnecting: true });
        setTimeout(() => this.setState({...this.state, isConnecting: false }), 2000);
    }

    render() {
        const { isConnecting, isLoadingPlayerCount, playerCount } = this.state;
        const feedbackText = isConnecting ? 'Connecting ...' : '';
        const playersOnlineText = isLoadingPlayerCount ? '' : `${playerCount} players online`;
        
        return (
            <View>
                <StatusBar barStyle="light-content" />
                <Image source={require('../assets/images/background.png')} style={styles.container}>
                    <Text style={styles.title}>Dice game</Text>
                    <Image source={require('../assets/images/separator-line.png')} style={styles.separatorLine} />
                    <View style={[styles.textInputContainer, this.state.isConnecting ? styles.disabled : {}]}>
                        <TextInput style={styles.textInput} maxLength={15} placeholder="Player name" placeholderTextColor={color.light2} />
                        <TouchableHighlight style={styles.button} disabled={this.state.isConnecting} onPress={() => this.onSubmit()}>
                            <Text style={styles.textButton}>GO</Text>
                        </TouchableHighlight>
                    </View>
                    <Text style={styles.feedbackText}>{feedbackText}</Text>
                    <Text style={styles.playersOnline}>{playersOnlineText}</Text>
                </Image>
            </View>
        );
    }
}
