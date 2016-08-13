import React from 'React';
import { TouchableHighlight, Text } from 'react-native';
import { styles } from '../styles/shared';

export default function Button(props) {
	const style = [props.style || props.button, props.disabled ? styles.disabled : null];
    return (
        <TouchableHighlight {...props} style={style}>
            <Text style={props.textStyle || styles.textButton}>{props.children}</Text>
        </TouchableHighlight>
    );
}
