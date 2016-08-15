import React from 'React';
import { Image, Animated } from 'react-native';

export default class Dice extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bounceValue: new Animated.Value(0)
        };
    }

    componentDidMount() {
        this.state.bounceValue.setValue(0.2);

        Animated.spring(
            this.state.bounceValue, {
                toValue: 1,
                friction: 3,
                tension: 80
            }
        ).start();
    }

    render() {
        const style = { transform: [{ scale: this.state.bounceValue }] };
        return (
            <Animated.Image source={this.props.source} style={[this.props.style, style]} />
        );
    }

}
