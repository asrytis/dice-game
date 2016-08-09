import React from 'React';
import { View, Text } from 'react-native';
import styles from '../styles/player';


export default class Player extends React.Component {

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.containerLeft}>
                	<Text style={styles.name}>Rytis (me)</Text>
                </View>
                <View style={styles.containerRight}>
	                <Text style={styles.score}>12</Text>
	                <View style={styles.diceContainer}>
	                    <View style={styles.dicePlaceholder}/>
	                    <View style={styles.dicePlaceholder}/>
	                    <View style={styles.dicePlaceholder}/>
	                    <View style={styles.dicePlaceholder}/>
	                </View>
                </View>
            </View>
		);
	}

}
