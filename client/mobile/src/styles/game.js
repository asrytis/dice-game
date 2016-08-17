import { StyleSheet } from 'react-native';
import { color, borderRadius, styles } from './shared';


export default StyleSheet.create({
    disabled: styles.disabled,
    navbar: {
        height: 64,
        alignSelf: 'stretch',
        backgroundColor: color.dark2,
    },
    navbarButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 44,
        paddingHorizontal: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navbarButtonRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 44,
        paddingHorizontal: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navbarButtonText: styles.textBody,
    header: {
        height: 156,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        ...styles.textTitle,
        marginTop: 2,
    },
    roundProgressContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: styles.textBody,
    playersContainer: {
        alignSelf: 'stretch',
        alignItems: 'stretch',
        paddingHorizontal: 14,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 36,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    button: {
        ...styles.button,
        width: 320,
        height: 68,
        borderRadius: borderRadius.large,
    },
    buttonText: {
        ...styles.textButton,
        fontSize: 19,
        fontWeight: null,
    },
});
