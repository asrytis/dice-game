import { StyleSheet } from 'react-native';
import { color, styles, borderRadius } from './shared';

export default StyleSheet.create({
    container: {
        height: 40,
        marginBottom: 1,
        paddingHorizontal: 14,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: borderRadius.small,
        backgroundColor: 'transparent',
        overflow: 'hidden'
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
    },
    winnerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.24)'
    }
});
