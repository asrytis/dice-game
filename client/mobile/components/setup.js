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
import styles from '../styles/setup';


export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnecting: false
        };
    }
    
    onOptionSelect() {
        this.setState({...this.state, isConnecting: true });
        setTimeout(() => this.setState({...this.state, isConnecting: false }), 2000);
    }

    render() {
        const { isConnecting } = this.state;
        const options = ['1 DICE', '2 DICE', '3 DICE', '4 DICE'];
        const feedbackText = isConnecting ? 'Connecting ...' : '';


        return (
            <View>
                <StatusBar barStyle="light-content" />
                <Image source={require('../assets/images/background.png')} style={styles.container}>
                    <View style={styles.navbar}>
                        <TouchableHighlight style={styles.navbarButton} onPress={() => {}}>
                            <Text style={styles.navbarButtonText}>&lt; Home</Text>
                        </TouchableHighlight>
                    </View>
                    <Text style={styles.title}>Game setup</Text>
                    <Text style={styles.instructions}>You’re the first player to join the table!
Please select the number of dice to roll:</Text>
                    <View style={[styles.buttonGroup, this.state.isConnecting ? styles.disabled : {}]}>
                        { options.map((label, index) => (
                            <TouchableHighlight key={index} style={styles.button} disabled={isConnecting} onPress={() => this.onOptionSelect(index)}>
                                <Text style={styles.buttonText}>{label}</Text>
                            </TouchableHighlight>
                        )) }
                    </View>
                    <Text style={styles.feedbackText}>{feedbackText}</Text>
                </Image>
            </View>
        );
    }
}
