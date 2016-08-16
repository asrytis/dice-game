import React from 'React';
import { View, Text, Image } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import styles, { winnerColor } from '../styles/player';
import Dice from './dice';

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
        return Array(length).fill(1).map((value, index) => {
            return <View key={index} style={styles.dicePlaceholder} />;
        });
    }

    renderDice(score) {
        return score.map((value, index) => {
            return <Dice key={index} value={value} style={styles.dice} />;
        });
    }

    render() {
        const { name, isUser, dice, score, slots, isWinner } = this.props;
        let content = dice ? this.renderDice(dice) : slots > 0 ? this.renderSlots(slots) : null;

        return (
            <View style={styles.container}>
                {isWinner && <AnimatedView animation="flash" style={styles.winnerBackground} />}
                <View style={styles.containerLeft}>
                    <Text style={styles.name}>{name} {isUser ? '(me)' : ''}</Text>
                </View>
                <View style={styles.containerRight}>
                    <Text style={[styles.score, { opacity: this.scoreAnimation }]}>{score}</Text>
                    <View style={styles.diceContainer}>
                        {content}
                    </View>
                </View>
            </View>
        );
    }

}
