import React from 'React';
import { TouchableHighlight, Text } from 'react-native';
import { styles } from '../styles/shared';


export default function Button(props) {
    return (
        <TouchableHighlight {...props} style={props.style || props.button}>
            <Text style={props.textStyle || styles.textButton}>{props.children}</Text>
        </TouchableHighlight>
    );
}