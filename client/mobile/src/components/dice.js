import React from 'React';
import { Image, Animated } from 'react-native';

const images = [
    require('../assets/images/dice/1.png'),
    require('../assets/images/dice/2.png'),
    require('../assets/images/dice/3.png'),
    require('../assets/images/dice/4.png'),
    require('../assets/images/dice/5.png'),
    require('../assets/images/dice/6.png')
];

export default class Dice extends React.Component {

    static propTypes = {
        value: React.PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.bounceValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.bounceValue.setValue(0.2);

        Animated.spring(this.bounceValue, {
            toValue: 1,
            friction: 3,
            tension: 80
        }).start();
    }

    render() {
        const style = { transform: [{ scale: this.bounceValue }] };
        
        return (
            <Animated.Image source={images[this.props.value - 1]} style={[this.props.style, style]} />
        );
    }

}
