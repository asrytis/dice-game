import React from 'react';
import { Image, StatusBar, View, StyleSheet } from 'react-native';


export default function Background(props) {
    return (
        <View>
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
    backgroundImage: {
        flex: 1,
        alignItems: 'stretch'
    },
    childrenContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});