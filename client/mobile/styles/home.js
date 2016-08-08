import { StyleSheet } from 'react-native';
import { color, fontSize, fontWeight, borderRadius, styles } from './shared';


export default StyleSheet.create({
    disabled: styles.disabled,
    container: styles.container,
    title: {
        ...styles.textTitle,
        marginTop: 109
    },
    separatorLine: {
        marginTop: 18
    },
    textInputContainer: {
        width: 240,
        height: 47,
        marginTop: 54,
        borderRadius: borderRadius.normal,
        backgroundColor: color.dark2
    },
    textInput: {
        ...styles.textBody,
        paddingLeft: 24,
        paddingRight: 88,
        paddingTop: 3,
        height: 47
    },
    button: {
        ...styles.button,
        position: 'absolute',
        top: 1,
        right: 1
    },
    buttonText: styles.textButton,
    feedbackText: {
        ...styles.textBody,
        width: 240,
        marginTop: 20,
        textAlign: 'center'
    },
    playersOnline: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 46,
        textAlign: 'center',
        fontSize: fontSize.normal,
        fontWeight: fontWeight.thin,
        color: color.light1
    }
});
