import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const SettingsScreen = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.navigate('Intro')
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SettingsScreen;