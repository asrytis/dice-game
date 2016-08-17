import { StyleSheet } from 'react-native';
import { styles } from './shared';

export default StyleSheet.create({
    title: {
        ...styles.textSubtitle,
        marginTop: 85,
    },
    paragraph: {
        ...styles.textBody,
        marginTop: 15,
        width: 260,
        textAlign: 'center',
    },
    button: {
        ...styles.button,
        width: 115,
        marginTop: 59,
    },
});
