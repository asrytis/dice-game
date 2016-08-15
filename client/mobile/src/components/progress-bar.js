import React from 'React';
import { View, Animated, Easing } from 'react-native';
import styles, { containerWidth, color } from '../styles/progress-bar';

export default class ProgressBar extends React.Component {

    static propTypes = {
        duration: React.PropTypes.number.isRequired,
        startTimestamp: React.PropTypes.number.isRequired,
        currentTimestamp: React.PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.progress = new Animated.Value(0);
    }

    componentDidMount() {
        this.startAnimation();
    }

    componentDidReceiveProps() {
        this.startAnimation();
    }

    startAnimation() {
        const progress = (this.props.currentTimestamp - this.props.startTimestamp) / this.props.duration;
        const timeLeft = (1 - progress) * this.props.duration;

        this.progress.setValue(progress);

        Animated.timing(this.progress, {
            duration: timeLeft,
            easing: Easing.linear,
            toValue: 1
        }).start();
    }

    render() {
        const width = this.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, containerWidth]
        });

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.bar, { width }]} />
            </View>
        );
    }

}
