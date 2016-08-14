import React from 'React';
import { View } from 'react-native';
import styles, { containerWidth } from '../styles/progress-bar';

export default class ProgressBar extends React.Component {

    static propTypes = {
        duration: React.PropTypes.number.isRequired,
        startTimestamp: React.PropTypes.number.isRequired,
        currentTimestamp: React.PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);

        this.state = this.getNewStateFromProps(this.props);
    }

    componentDidMount() {
        this.timerId = setInterval(() => {
            this.setState({
                elapsed: (this.props.currentTimestamp - this.props.startTimestamp) + (new Date().getTime() - this.state.localStartTimestamp)
            });
        }, 50);
    }

    componentDidReceiveProps() {
        this.setState(this.getNewStateFromProps(this.props));
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    getNewStateFromProps(props) {
        return {
            localStartTimestamp: new Date().getTime(),
            elapsed: props.currentTimestamp - props.startTimestamp
        }
    }

    render() {
        const width = containerWidth * this.state.elapsed / this.props.duration;

        return (
            <View style={styles.container}>
                <View style={[styles.bar, { width }]} />
            </View>
        );
    }

}
