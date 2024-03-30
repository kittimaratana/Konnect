import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserImage = ({ picture, userId, width, height }) => {
    const navigation = useNavigation();

    const handleViewProfile = () => {
        navigation.navigate('ViewOtherProfile', {userId})
    }

    return (
        <TouchableOpacity style={{width: width, height: height}} onPress={handleViewProfile}>
            <Image
                style={{ width: '100%', height: '100%' }}
                source={{ uri: `http://localhost:5001${picture}` }}
            />
        </TouchableOpacity>
    )
}

export default UserImage;