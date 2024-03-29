//design style
import { StyleSheet } from 'react-native';

//colors
export const colors = {
    white: '#FFFFFF',
    black: '#0A0A0A',
    lightPurple: '#E3CEF6', 
    darkPurple: '#5B0BAB',
    pink: '#F5B3F0',
    blue: '#3B50ED',
    redButton: '#F6C0B5',
    purpleButton: '#8B6CE5',
    redError: '#F16247',
    gray: '#878387'
};

//spacing
export const spacing = {
    margin: 16,
    padding: 16,
    component: 16,
    gutter: 8,
    lineHeight: 2
};

//fontsize
export const fontSize = {
    nameIntro: 30,
    header: 22,
    sectionHeader: 16,
    fields: 18,
    body: 12,
};

//form fields
export const form = StyleSheet.create({
    input: {
        width: '100%',
        paddingHorizontal: spacing.padding,
        paddingBottom: spacing.gutter,
        paddingTop: spacing.component,
        alignItems: 'flex-start',
        fontSize: fontSize.fields
    },
    field: {
        width: '100%',
        padding: spacing.padding,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
        borderRadius: 16,
        fontSize: fontSize.fields
    }
});