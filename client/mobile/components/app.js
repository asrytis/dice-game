import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    StatusBar
} from 'react-native';

const colors = {
    light1: '#FBFFED',
    light2: '#EEEFE3',
    dark1: '#002B47',
    dark2: 'rgba(0, 0, 0, 0.33)'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    h1: {
        fontSize: 42,
        fontWeight: '200',
        textAlign: 'center',
        margin: 10,
        marginTop: 109,
        color: colors.light1
    },
    separatorLine: {
        marginTop: 18
    },
    textInputContainer: {
        width: 240,
        height: 47,
        marginTop: 54,
        borderRadius: 20,
        backgroundColor: colors.dark2
    },
    textInput: {
        paddingLeft: 24,
        paddingRight: 88,
        paddingTop: 3,
        height: 47,
        fontSize: 16,
        color: colors.light1
    },
    button: {
        position: 'absolute',
        top: 1,
        right: 1,
        width: 64,
        height: 45,
        borderRadius: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light1
    },
    buttonText: {
        fontWeight: '500',
        fontSize: 16,
        color: colors.dark1
    },
    playersOnline: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 46,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '200',
        color: colors.light1
    }
});

export default class extends React.Component {
    render() {
        return (
            <View>
                <StatusBar barStyle="light-content" />
                <Image source={require('../assets/images/background.png')} style={styles.container}>
                    <Text style={styles.h1}>Dice game</Text>
                    <Image source={require('../assets/images/separator-line.png')} style={styles.separatorLine} />
                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput} placeholder="Player name" placeholderTextColor={colors.light2} />
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>GO</Text>
                        </View>
                    </View>
                    <Text style={styles.playersOnline}>18 players online</Text>
                </Image>
            </View>
        );
    }
}