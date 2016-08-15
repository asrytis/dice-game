import React from 'React';
import { View, Text, Image, Animated, Easing } from 'react-native';
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

    constructor(props) {
        super(props);
        this.backgroundAnimation = new Animated.Value(0);
    }

    componentDidMount() {
        this.startAnimation();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isWinner !== this.props.isWinner) {
            this.backgroundAnimation.setValue(0);
            this.startAnimation();
        }
    }

    startAnimation() {
        if (this.props.isWinner) {
            Animated.timing(this.backgroundAnimation, {
                toValue: 1,
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                delay: 200
            }).start();
        }
    }

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
        const backgroundColor = this.backgroundAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [winnerColor.start, winnerColor.end]
        });

        return (
            <Animated.View style={[styles.container, { backgroundColor }]}>
                <View style={styles.containerLeft}>
                    <Text style={styles.name}>{name} {isUser ? '(me)' : ''}</Text>
                </View>
                <View style={styles.containerRight}>
                    <Text style={[styles.score, { opacity: this.scoreAnimation }]}>{score}</Text>
                    <View style={styles.diceContainer}>
                        {content}
                    </View>
                </View>
            </Animated.View>
        );
    }

}
