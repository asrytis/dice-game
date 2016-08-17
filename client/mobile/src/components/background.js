import React from 'react';
import { Image, StatusBar, View } from 'react-native';
import styles from '../styles/background';

const image = require('../assets/images/background.png');

const Background = (props) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image source={image} style={styles.backgroundImage}>
            <View style={styles.childrenContainer}>
                {props.children}
            </View>
        </Image>
    </View>
);

Background.propTypes = {
    children: React.PropTypes.node,
};

export default Background;
