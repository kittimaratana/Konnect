import { useState, React } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors, spacing, fontSize, form } from '../styles/styles';
import ActionButton from '../components/ActionButton';

//user login screen
const LoginScreen = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasSubmit, setHasSubmit] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    //if user clicks back button
    const handleBack = () => {
        navigation.goBack();
    }

    //if user does not have account
    const handleNewAccount = () => {
        navigation.navigate('Register');
    }

    //check email validation 
    const emailValidation = (email) => {
        const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validEmailRegex.test(email)
    }

    //check validation for user input
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setHasSubmit(true);
        setInvalidCredentials(false);

        //check if login credentials matches format and if so, call server
        //if user credentials are verified, then user is navigated to the main screen
        let fieldError = false;

        if (email === "" || password === "") {
            fieldError = true;
        }

        if (!emailValidation(email)) {
            fieldError = true;
        }

        if (fieldError === false) {
            try {
                const response = await axios.post("http://localhost:5001/auth/login", {
                    email: email,
                    password: password
                });

                AsyncStorage.setItem("token", response.data.token);
                setSuccess(true);
                setError(null);
                navigation.navigate('Main');
            } catch (error) {
                setSuccess(false);
                setError(error.response.data);

                if (error.response.status === 401) {
                    setInvalidCredentials(true);
                }
            }
        }
    }

    //UI for Login page, form validation messages and customized button styling from ActionButton component
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subTitle}>Please enter your login credentials</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={form.input}>Email</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && email === "" ? styles.errorInputBorder : null,
                ]}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Enter Email"
                />
                {hasSubmit && email === "" ? <Text style={styles.errorMessage}>*Please enter your email address</Text> : null}
                {hasSubmit && email !== "" && !emailValidation(email) ? <Text style={styles.errorMessage}>*Please enter a valid email address</Text> : null}
                <Text style={form.input}>Password</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && password === "" ? styles.errorInputBorder : null,
                ]}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    placeholder="Enter password"
                />
                {hasSubmit && password === "" ? <Text style={styles.errorMessage}>*Please enter your password</Text> : null}
                <View style={styles.actionContainer}>
                    <ActionButton style={styles.backButton} onPress={handleBack} title="Cancel" />
                    <ActionButton style={styles.loginButton} textColor={colors.white} onPress={handleLoginSubmit} title="Submit" />
                </View>
                {hasSubmit && invalidCredentials ? <Text style={styles.errorMessage}>*Login credentials do not match</Text> : null}
            </View>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={handleNewAccount} >
                <Text style={styles.createAccountButton}>Create account</Text>
            </TouchableOpacity>
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
        height: '30%',
    },
    title: {
        marginBottom: spacing.component,
        fontSize: fontSize.header,
        fontWeight: '500'
    },
    subTitle: {
        marginBottom: spacing.component,
        fontSize: fontSize.sectionHeader,
    },
    formContainer: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: spacing.margin,
    },
    actionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.component * 2
    },
    backButton: {
        width: '48%',
        backgroundColor: colors.redButton
    },
    loginButton: {
        width: '48%'
    },
    createAccountButton: {
        color: colors.purpleButton,
        marginTop: spacing.lineHeight
    },
    errorInputBorder: {
        borderWidth: 1,
        borderColor: colors.redError
    },
    errorMessage: {
        marginTop: spacing.component,
        color: colors.redError,
        width: '100%',
        textAlign: 'left'
    },
});
export default LoginScreen;