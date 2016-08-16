import React from 'react';
import { Image, StatusBar, View, StyleSheet } from 'react-native';

export default function Background(props) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Image source={require('../assets/images/background.png')} style={styles.backgroundImage}>
                <View style={styles.childrenContainer}>
                    {props.children}
                </View>
            </Image>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        flex: 1,
        resizeMode: Image.resizeMode.stretch,
        width: null,
        height: null
    },
    childrenContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});
