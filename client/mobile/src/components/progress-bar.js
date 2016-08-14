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

        this.state = {
            localStartTimestamp: new Date().getTime(),
            elapsed: this.props.currentTimestamp - this.props.startTimestamp
        };
    }

    componentDidMount() {
        this.timerId = setInterval(() => {
            this.setState({
                elapsed: (this.props.currentTimestamp - this.props.startTimestamp) + (new Date().getTime() - this.state.localStartTimestamp)
            });
        }, 50);
    }

    componentDidReceiveProps() {
        this.setState({
            localStartTimestamp: new Date().getTime(),
            elapsed: this.props.currentTimestamp - this.props.startTimestamp
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
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
