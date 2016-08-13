import { StyleSheet } from 'react-native';
import { color, styles, borderRadius } from './shared';


export default StyleSheet.create({
    container: {
        height: 48,
        marginBottom: 1,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: borderRadius.small,
        backgroundColor: 'rgba(255, 255, 255, 0.24)'
    },
    containerLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    containerRight: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    name: styles.textBody,
    score: styles.textBody,
    diceContainer: {
        width: 108,
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    dicePlaceholder: {
        width: 24,
        height: 24,
        marginLeft: 4,
        borderRadius: borderRadius.tiny,
        backgroundColor: color.dark3
    },
    dice: {
        marginLeft: 4
    }
});
