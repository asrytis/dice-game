import React from 'react';
import { View, Animated, Easing } from 'react-native';
import styles, { containerWidth } from '../styles/progress-bar';

export default class ProgressBar extends React.Component {

    constructor(props) {
        super(props);
        this.progress = new Animated.Value(0);
    }

    componentDidMount() {
        this.startAnimation();
    }

    componentDidUpdate() {
        this.startAnimation();
    }

    startAnimation() {
        const { currentTimestamp, startTimestamp, duration } = this.props;
        const progress = (currentTimestamp - startTimestamp) / duration;
        const timeLeft = (1 - progress) * duration;

        this.progress.setValue(progress);

        Animated.timing(this.progress, {
            duration: timeLeft,
            easing: Easing.linear,
            toValue: 1,
        }).start();
    }

    render() {
        const width = this.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, containerWidth],
        });

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.bar, { width }]} />
            </View>
        );
    }

}

ProgressBar.propTypes = {
    duration: React.PropTypes.number.isRequired,
    startTimestamp: React.PropTypes.number.isRequired,
    currentTimestamp: React.PropTypes.number.isRequired,
};
