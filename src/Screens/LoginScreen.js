import {useState, React} from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({ route }) => {
    const { handleLogin } = route.params;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleBack = () => {
        navigation.goBack();
    }

    //add validation after
    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5001/auth/login", {
                email: email,
                password: password
            });

            AsyncStorage.setItem("token", response.data.token);
            handleLogin();
            setSuccess(true);
            setError(null);
            navigation.navigate('Main');
        } catch (error) {
            setSuccess(false);
            setError(error.response.data);
        }
    }

    return (
        <View style={styles.container}>
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
            <TouchableWithoutFeedback onPress={handleBack}>
                <Text>Back</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleLoginSubmit}>
                <Text>Login</Text>
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

export default LoginScreen;