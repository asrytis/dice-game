import React from 'react';
import { View, Text } from 'react-native';
import { View as AnimatedView, Text as AnimatedText } from 'react-native-animatable';
import styles from '../styles/player';
import Dice from './dice';

export default class Player extends React.Component {

    renderSlots(length) {
        return Array(length).fill(1).map((value, index) => (
            <View key={index} style={styles.dicePlaceholder} />
        ));
    }

    renderDice(score) {
        return score.map((value, index) => (
            <Dice key={index} value={value} style={styles.dice} />
        ));
    }

    render() {
        const { name, isUser, dice, score, slots, isWinner } = this.props;
        let content;

        if (dice) {
            content = this.renderDice(dice);
        } else if (slots > 0) {
            content = this.renderSlots(slots);
        }

        return (
            <AnimatedView animation="fadeIn" duration={300} style={styles.container}>
                {isWinner && <AnimatedView animation="flash" style={styles.winnerBackground} />}
                <View style={styles.containerLeft}>
                    <Text style={styles.name}>{name} {isUser ? '(me)' : ''}</Text>
                </View>
                <View style={styles.containerRight}>
                    {score && <AnimatedText
                        animation="fadeIn"
                        duration={300}
                        delay={500}
                        style={styles.score}
                    >{score}</AnimatedText>}
                    {content}
                </View>
            </AnimatedView>
        );
    }

}

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    isUser: React.PropTypes.bool.isRequired,
    score: React.PropTypes.number,
    dice: React.PropTypes.array,
    slots: React.PropTypes.number,
    isWinner: React.PropTypes.bool.isRequired,
};
