import { useState, React } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors, spacing, fontSize, form } from '../styles/styles';
import ActionButton from '../components/ActionButton';

const LoginScreen = ({ route }) => {
    const { handleLogin } = route.params;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasSubmit, setHasSubmit] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    }

    //add validation after
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setHasSubmit(true);
        setInvalidPassword(false);

        let fieldError = false;

        if (email === "" || password === "") {
            fieldError = true;
        }

        if (fieldError === false) {
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

                if(error.response.status === 401) {
                    setInvalidPassword(true);
                }
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Login</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={form.input}>Email</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && email === "" ? styles.error : null,
                ]}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Text style={form.input}>Password</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && password === "" ? styles.error : null,
                ]}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
                {hasSubmit && invalidPassword ? <Text style={styles.errorPassword}>Login credentials do not match</Text>: null}
                <View style={styles.actionContainer}>
                    <ActionButton style={styles.backButton} onPress={handleBack} title="Back" />
                    <ActionButton style={styles.loginButton} textColor={colors.white} onPress={handleLoginSubmit} title="Login" />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.lightPurple,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '40%'
    },
    title: {
        marginBottom: spacing.component,
        fontSize: fontSize.header
    },
    formContainer: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: spacing.margin,
    },
    actionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.component
    },
    backButton: {
        width: '48%',
        backgroundColor: colors.redButton
    },
    loginButton: {
        width: '48%'
    },
    error: {
        borderWidth: 1,
        borderColor: colors.redError
    },
    errorPassword: {
        marginTop: spacing.component,
        color: colors.redError
    }

});
export default LoginScreen;