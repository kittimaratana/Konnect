import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const ActionButton = ({style, onPress, title }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#6733ff',
        borderRadius: 16,
    }

});
export default ActionButton;