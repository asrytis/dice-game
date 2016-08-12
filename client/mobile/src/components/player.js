import React from 'React';
import { View, Text, Image } from 'react-native';
import styles from '../styles/player';

const dice = [
    require('../assets/images/dice/1.png'),
    require('../assets/images/dice/2.png'),
    require('../assets/images/dice/3.png'),
    require('../assets/images/dice/4.png'),
    require('../assets/images/dice/5.png'),
    require('../assets/images/dice/6.png')
];

export default class Player extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerLeft}>
                    <Text style={styles.name}>Rytis (me)</Text>
                </View>
                <View style={styles.containerRight}>
                    <Text style={styles.score}>12</Text>
                    <View style={styles.diceContainer}>
                        <Image source={dice[0]} />
                        <Image source={dice[2]} />
                        <Image source={dice[4]} />
                        <View style={styles.dicePlaceholder} />
                    </View>
                </View>
            </View>
        );
    }

}
