import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {colors, spacing, fontSize} from '../styles/styles';

const Header = () => {
    return (
        <Text style={styles.container}>Konnect</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: spacing.padding,
        textAlign: 'center',
        fontSize: fontSize.header,
        color: colors.purpleButton
    }

});
export default Header;