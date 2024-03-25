import { useState, React } from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'

const RegisterScreen = ({ route }) => {
    const { handleLogin } = route.params;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleBack = () => {
        navigation.goBack();
    }

    //add validation after
    const handleRegister = async (event) => {
        event.preventDefault();
        
        if (password === confirmPassword) {
            console.log("yes");
        }

        try {
            const response = await axios.post("http://localhost:5001/auth/register", {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            });

            AsyncStorage.setItem("token", response.data.token);
            setSuccess(true);
            setError(null);
            navigation.navigate('RegisterProfile', {handleLogin: handleLogin});
        } catch (error) {
            setSuccess(false);
            setError(error.response.data);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text>First Name</Text>
                <TextInput
                    placeholder="Please enter your first name"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />
            </View>
            <View>
                <Text>Last Name</Text>
                <TextInput
                    placeholder="Please enter your last name"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
            </View>
            <View>
                <Text>Login</Text>
                <TextInput
                    placeholder="Please enter your username"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View>
                <Text>Password</Text>
                <TextInput
                    placeholder="Please enter your password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>
            <View>
                <Text>Confirm Password</Text>
                <TextInput
                    placeholder="Please enter your password"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    secureTextEntry={true}
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

export default RegisterScreen;