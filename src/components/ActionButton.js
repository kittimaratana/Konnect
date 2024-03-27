import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import {colors, spacing, fontSize} from '../styles/styles';

const ActionButton = ({style, onPress, title, textColor }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={{color: textColor || colors.black}}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: spacing.padding,
        alignItems: 'center',
        backgroundColor: colors.purpleButton,
        borderRadius: 16,
        fontSize: fontSize.body,
    }

});
export default ActionButton;