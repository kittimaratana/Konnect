import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//resuable component to display user image and once the image is press, the user can view the profile details
const UserImage = ({ picture, userId, width, height }) => {
    const navigation = useNavigation();

    //navigate to view profile details
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