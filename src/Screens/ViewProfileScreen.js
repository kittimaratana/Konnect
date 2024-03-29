import { useState, useEffect, React } from "react";
import {Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import ViewProfile from '../components/ViewProfile';

const ViewProfileScreen = ({ route }) => {
    const { userId } = route.params;
    const navigation = useNavigation();
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token')

            if(userId !== "") {
                const userResponse = await axios.get(`http://localhost:5001/users/${userId}`, {
                    headers: {
                        authorization: `Bear ${token}`
                    }
                });
    
                setUser(userResponse.data);
                setIsLoading(false);

            } else {
                const userResponse = await axios.get("http://localhost:5001/users/", {
                    headers: {
                        authorization: `Bear ${token}`
                    }
                });
    
                setUser(userResponse.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error.response.data);
            setIsLoading(false);
            setHasError(true);
        }
    }

    useEffect(() => {
        // Fetching events for user
        fetchUser();
    }, []);

    if (hasError) {
        return (
            <Text>Unable to pull data right now</Text>
        );
    }

    if (isLoading) {
        return <Text>Is Loading...</Text>;
    }

    return (
        <ViewProfile navigation={navigation} user={user}/>
    )
}

export default ViewProfileScreen;