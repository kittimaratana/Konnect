import React from 'react';
import {Image} from 'react-native';

const UserImage = ({picture}) => {
    return (
        <Image
            style={{ width: '100%', height: '65%' }}
            source={{ uri: `http://localhost:5001${picture}` }}
        />
    )
}

export default UserImage;