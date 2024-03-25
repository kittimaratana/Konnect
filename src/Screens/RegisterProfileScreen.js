import { useState, React } from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'

const RegisterProfileScreen = ({ route }) => {
    const { handleLogin } = route.params;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigation = useNavigation();
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [career, setCareer] = useState('');
    const [city, setCity] = useState('');
    const [interests, setInterests] = useState('');
    const [picture, setPicture] = useState('');
    const [bio, setBio] = useState('');
    const [petPeeves, setPetPeeves] = useState('');

    const handleBack = () => {
        navigation.goBack();
    }

    //add validation after
    const handleRegister = async (event) => {

        try {
            const token = await AsyncStorage.getItem('token')
            await axios.put("http://localhost:5001/users", {
                gender: gender,
                birthday: birthday,
                career: career,
                city: city,
                interests: interests,
                picture: picture,
                bio: bio,
                pet_peeves: petPeeves
            }, {
                headers: {
                    authorization: `Bear ${token}`
                }
            });
            setSuccess(true);
            setError(null);
            handleLogin();
            navigation.navigate('Main');
        } catch (error) {
            setSuccess(false);
            console.log(error.response.data);
            setError(error.response.data);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text>Gender</Text>
                <TextInput
                    placeholder="Please enter your gender"
                    value={gender}
                    onChangeText={(text) => setGender(text)}
                />
            </View>
            <View>
                <Text>Birthday</Text>
                <TextInput
                    placeholder="Please enter your birthday"
                    value={birthday}
                    onChangeText={(text) => setBirthday(text)}
                />
            </View>
            <View>
                <Text>Career</Text>
                <TextInput
                    placeholder="Please enter your career"
                    value={career}
                    onChangeText={(text) => setCareer(text)}
                />
            </View>
            <View>
                <Text>City</Text>
                <TextInput
                    placeholder="Please enter your city"
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
            </View>
            <View>
                <Text>Interests</Text>
                <TextInput
                    placeholder="Please enter your interests"
                    value={interests}
                    onChangeText={(text) => setInterests(text)}
                />
            </View>
            <View>
                <Text>Picture</Text>
                <TextInput
                    placeholder="Please enter your picture"
                    value={picture}
                    onChangeText={(text) => setPicture(text)}
                />
            </View>
            <View>
                <Text>Bio</Text>
                <TextInput
                    placeholder="Please enter your bio"
                    value={bio}
                    onChangeText={(text) => setBio(text)}
                />
            </View>
            <View>
                <Text>Pet Peeves</Text>
                <TextInput
                    placeholder="Please enter your pet peeves"
                    value={petPeeves}
                    onChangeText={(text) => setPetPeeves(text)}
                />
            </View>
            <TouchableWithoutFeedback onPress={handleBack}>
                <Text>Back</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleRegister}>
                <Text>Register</Text>
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

export default RegisterProfileScreen;