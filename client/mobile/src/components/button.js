import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import { styles } from '../styles/shared';

const Button = (props) => {
    const style = [
        props.style || styles.button,
        props.disabled ? styles.disabled : null,
    ];

    return (
        <TouchableHighlight {...props} style={style}>
            <Text style={props.textStyle || styles.textButton}>{props.children}</Text>
        </TouchableHighlight>
    );
};

Button.propTypes = {
    children: React.PropTypes.node,
    style: TouchableHighlight.propTypes.style,
    textStyle: Text.propTypes.style,
    disabled: React.PropTypes.bool,
};

export default Button;
