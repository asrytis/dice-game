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

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        isUser: React.PropTypes.bool.isRequired,
        score: React.PropTypes.number,
        dice: React.PropTypes.array,
        slots: React.PropTypes.number,
        isWinner: React.PropTypes.bool.isRequired
    };

    renderSlots(length) {
        return Array(length).fill(1).map((value, index) => <View key={index} style={styles.dicePlaceholder} />);
    }

    renderDice(score) {
        return score.map((value, index) => <Image key={index} source={dice[value-1]} style={styles.dice} />);
    }

    render() {
        const { name, isUser, dice, score, slots, isWinner } = this.props;
        let content = dice ? this.renderDice(dice) : slots > 0 ? this.renderSlots(slots) : null;

        return (
            <View style={styles.container}>
                <View style={styles.containerLeft}>
                    <Text style={styles.name}>{name} {isUser ? '(me)' : ''}</Text>
                </View>
                <View style={styles.containerRight}>
                    <Text style={styles.score}>{score}</Text>
                    <View style={styles.diceContainer}>
                        {content}
                    </View>
                </View>
            </View>
        );
    }

}
