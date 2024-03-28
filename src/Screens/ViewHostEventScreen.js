import React from 'react';
import {View, Text} from 'react-native';

const ViewHostEventScreen = ({route}) => {
    const {eventId} = route.params;
    
    return (
        <View>
            <Text>View Host Event Screen</Text>
            <Text>{eventId}</Text>
        </View>
    )
}

export default ViewHostEventScreen;