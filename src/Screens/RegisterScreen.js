import { useState, React } from 'react';
import { View, Text,TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors, spacing, fontSize, form } from '../styles/styles';
import ActionButton from '../components/ActionButton';

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
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [hasSubmit, setHasSubmit] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    }

    //add validation after
    const handleRegister = async (event) => {
        event.preventDefault();
        setInvalidPassword(false);
        setHasSubmit(true);
        let fieldError = false;

        if ([firstName, lastName, email, password, confirmPassword].some(field => field === "")) {
            fieldError = true;
        }

        if (password !== confirmPassword) {
            fieldError = true;
            setInvalidPassword(true);
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
                navigation.navigate('RegisterProfile', { handleLogin: handleLogin });
            } catch (error) {
                setSuccess(false);
                setError(error.response.data);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Register</Text>
            </View>
            <View style={styles.formContainer}>
                    <Text style={form.input}>First Name</Text>
                    <TextInput style={[
                        form.field,
                        hasSubmit && firstName === "" ? styles.error : null,
                    ]}
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                    />
                    <Text style={form.input}>Last Name</Text>
                    <TextInput style={[
                        form.field,
                        hasSubmit && lastName === "" ? styles.error : null,
                    ]}
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                    />
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
                    <Text style={form.input}>Confirm Password</Text>
                    <TextInput style={[
                        form.field,
                        hasSubmit && confirmPassword === "" ? styles.error : null,
                    ]}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry={true}
                    />
                    {hasSubmit && invalidPassword ? <Text style={styles.errorPassword}>Password do not match</Text>: null}
                <View style={styles.actionContainer}>
                    <ActionButton style={styles.backButton} onPress={handleBack} title="Back" />
                    <ActionButton style={styles.loginButton} textColor={colors.white} onPress={handleRegister} title="Register" />
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
        justifyContent: 'flex-end',
        height: '10%'
    },
    title: {
        marginBottom: spacing.component,
        fontSize: fontSize.header
    },
    formContainer: {
        width: '100%',
        height: '90%',
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

export default RegisterScreen;