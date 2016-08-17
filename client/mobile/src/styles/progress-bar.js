import { StyleSheet } from 'react-native';
import { color } from './shared';

export const containerWidth = 220;

export default StyleSheet.create({
    container: {
        height: 4,
        width: containerWidth,
        backgroundColor: color.dark2,
    },
    bar: {
        height: 4,
        backgroundColor: color.light1,
    },
});
