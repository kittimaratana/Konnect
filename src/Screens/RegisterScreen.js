import { useState, React } from 'react';
import { View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors, spacing, fontSize, form } from '../styles/styles';
import ActionButton from '../components/ActionButton';

const RegisterScreen = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hasSubmit, setHasSubmit] = useState(false);

    //if user clicks back button
    const handleBack = () => {
        navigation.goBack();
    }

    //if user does not have account
    const handleLogin = () => {
        navigation.navigate('Login');
    }

    //check email validation 
    const emailValidation = (email) => {
        const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validEmailRegex.test(email)
    }

    //check validation for user input
    const handleRegister = async (event) => {
        event.preventDefault();
        setHasSubmit(true);

        //check if login credentials matches format and if so, call server
        let fieldError = false;

        if ([firstName, lastName, email, password, confirmPassword].some(field => field === "")) {
            fieldError = true;
        }

        if (!emailValidation(email)) {
            fieldError = true;
        }

        if (password !== confirmPassword) {
            fieldError = true;
        }

        if (fieldError === false) {
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
                navigation.navigate('RegisterProfile');
            } catch (error) {
                setSuccess(false);
                setError(error.response.data);
            }
        }
    }

    //UI for Register page, form validation messages and customized button styling from ActionButton component
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Register</Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={form.input}>First Name</Text>
                    <TextInput style={[
                        form.field,
                        hasSubmit && firstName === "" ? styles.errorInputBorder : null,
                    ]}
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                        placeholder="Enter First Name"
                    />
                    {hasSubmit && firstName === "" ? <Text style={styles.errorMessage}>*Please enter your first name</Text> : null}
                    <Text style={form.input}>Last Name</Text>
                    <TextInput style={[
                        form.field,
                        hasSubmit && lastName === "" ? styles.errorInputBorder : null,
                    ]}
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                        placeholder="Enter Last Name"
                    />
                    {hasSubmit && lastName === "" ? <Text style={styles.errorMessage}>*Please enter your last name</Text> : null}
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
                    <Text style={form.input}>Confirm Password</Text>
                    <TextInput style={[
                        form.field,
                        hasSubmit && confirmPassword === "" ? styles.errorInputBorder : null,
                    ]}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry={true}
                        placeholder="Reenter password"
                    />
                    {hasSubmit && confirmPassword === "" ? <Text style={styles.errorMessage}>*Please reenter your password</Text> : null}
                    {hasSubmit && confirmPassword !== "" && password !== confirmPassword ? <Text style={styles.errorMessage}>*Password do not match</Text> : null}
                    <View style={styles.actionContainer}>
                        <ActionButton style={styles.backButton} onPress={handleBack} title="Back" />
                        <ActionButton style={styles.registerButton} textColor={colors.white} onPress={handleRegister} title="Register" />
                    </View>
                </View>
                <View style={styles.loginContainer}>
                    <Text>Have an account?</Text>
                    <TouchableOpacity onPress={handleLogin} >
                        <Text style={styles.loginButton}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightPurple,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    title: {
        marginTop: spacing.margin * 2,
        marginBottom: spacing.component,
        fontSize: fontSize.header
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: spacing.margin,
    },
    actionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.component,
        paddingBottom: 20
    },
    backButton: {
        width: '48%',
        backgroundColor: colors.redButton
    },
    registerButton: {
        width: '48%'
    },
    loginContainer: {
        width: '100%',
        alignItems: 'center',
    },
    loginButton: {
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

export default RegisterScreen;