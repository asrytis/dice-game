import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, View, Image, TextInput } from 'react-native';
import autobind from 'autobind-decorator';
import { fetchPlayers } from '../actions/players-online';
import { color } from '../styles/shared';
import styles from '../styles/home';
import Background from './background';
import Button from './button';


const mapStateToProps = ({ routes, playersOnline }) => ({ routes, playersOnline });
const mapDispatchToProps = { fetchPlayers };

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isConnecting: false
        };
    }

    componentWillReceiveProps(nextProps) {
        // Fetch player count whenever this scene gets focused
        const currentScene = this.props.routes.scene.name;
        const nextScene = nextProps.routes.scene.name;

        if (nextScene === 'home' && currentScene !== nextScene) {
            this.props.fetchPlayers();
        }
    }
    
    @autobind
    onSubmit() {
        this.setState({ isConnecting: true });
        setTimeout(() => {
            this.setState({ isConnecting: false });
            Actions.setup();
        }, 2000);
    }

    render() {
        const { isConnecting } = this.state;
        const { playersOnline } = this.props;
        const feedbackText = isConnecting ? 'Connecting ...' : '';
        const playersOnlineText = !playersOnline.isFetching && !playersOnline.error ? `${playersOnline.value} players online` : '';
        
        return (
            <Background>
                <Text style={styles.title}>Dice game</Text>
                <Image source={require('../assets/images/separator-line.png')} style={styles.separatorLine} />
                <View style={[styles.textInputContainer, isConnecting ? styles.disabled : {}]}>
                    <TextInput style={styles.textInput} maxLength={15} placeholder="Player name" placeholderTextColor={color.light2} />
                    <Button style={styles.button} disabled={isConnecting} onPress={this.onSubmit}>GO</Button>
                </View>
                <Text style={styles.feedbackText}>{feedbackText}</Text>
                <Text style={styles.playersOnline}>{playersOnlineText}</Text>
            </Background>
        );
    }
}
