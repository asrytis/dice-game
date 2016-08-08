import { StyleSheet } from 'react-native';


export const color = {
    light1: '#FBFFED',
    light2: '#EEEFE3',
    dark1: '#002B47',
    dark2: 'rgba(0, 0, 0, 0.33)'
};

export const fontSize = {
    normal: 16,
    title: 42,
    subtitle: 24
};

export const fontWeight = {
    thin: '200',
    medium: '500'
};

export const borderRadius = {
    normal: 20
};

// Base styles to extend from
export const styles = {
    disabled: {
        opacity: 0.5
    },
    textTitle: {
        fontSize: fontSize.title,
        fontWeight: fontWeight.thin,
        textAlign: 'center',
        margin: 10,
        color: color.light1
    },
    textSubtitle: {
        fontSize: fontSize.subtitle,
        textAlign: 'center',
        margin: 10,
        color: color.light1
    },
    textBody: {
        fontSize: fontSize.normal,
        color: color.light1
    },
    textButton: {
        fontWeight: fontWeight.medium,
        fontSize: fontSize.normal,
        color: color.dark1
    },
    button: {
        width: 64,
        height: 45,
        borderRadius: borderRadius.normal,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.light1
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
};