import { useState, React } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Button, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors, spacing, fontSize, form } from '../styles/styles';
import ActionButton from '../components/ActionButton';
import * as ImagePicker from 'expo-image-picker';

const RegisterProfileScreen = ({ route }) => {
    const { handleLogin } = route.params;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigation = useNavigation();
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [career, setCareer] = useState('');
    const [city, setCity] = useState('');
    const [interests, setInterests] = useState('');
    const [picture, setPicture] = useState(null);
    const [bio, setBio] = useState('');
    const [petPeeves, setPetPeeves] = useState('');
    const [hasSubmit, setHasSubmit] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    }

    const onChange = (event, selectedDate) => {
        setShowDatePicker(false);
        setBirthday(selectedDate);
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPicture(result.assets[0].uri);
        }
    };

    //add validation after
    const handleRegister = async (event) => {
        event.preventDefault();
        setHasSubmit(true);
        let fieldError = false;

        if ([gender, birthday, career, city, interests, picture, bio, petPeeves].some(field => field === "")) {
            fieldError = true;
        }

        const options = {
            year: 'numeric', 
            month: '2-digit',
            day: '2-digit'
        }

        if (fieldError === false) {
            try {
                const token = await AsyncStorage.getItem('token');
                await axios.put("http://localhost:5001/users", {
                    gender: gender,
                    birthday: birthday.toLocaleDateString('en-CA', options),
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
                setError(error.response.data);
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Enter Details: </Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={form.input}>Gender</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && gender === "" ? styles.error : null,
                ]}
                    value={gender}
                    onChangeText={(text) => setGender(text)}
                />
                <Text style={form.input}>Birthday</Text>
                {showDatePicker && (
                    <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={birthday}
                        onChange={onChange}
                    />
                )}
                <TouchableOpacity style={form.field} onPress={() => setShowDatePicker(true)} >
                    <Text >{birthday.toDateString()}</Text>
                </TouchableOpacity>
                <Text style={form.input}>Career</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && career === "" ? styles.error : null,
                ]}
                    value={career}
                    onChangeText={(text) => setCareer(text)}
                />
                <Text style={form.input}>City</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && city === "" ? styles.error : null,
                ]}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <Text style={form.input}>Interests</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && interests === "" ? styles.error : null,
                ]}
                    placeholder="i.e., singing, fitness, travelling..."
                    value={interests}
                    onChangeText={(text) => setInterests(text)}
                />
                <Text style={form.input}>Picture</Text>
                {picture && 
                    <Image source={{uri: picture}} style={styles.formPicture} />
                }
                <Text style={styles.buttonPicture} onPress={pickImage}>New Picture</Text>
                <Text style={form.input}>Bio</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && bio === "" ? styles.error : null,
                ]}
                    placeholder="Add your story"
                    value={bio}
                    onChangeText={(text) => setBio(text)}
                />
                <Text style={form.input}>Pet Peeves</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && petPeeves === "" ? styles.error : null,
                ]}
                    placeholder="i.e., slow walkers"
                    value={petPeeves}
                    onChangeText={(text) => setPetPeeves(text)}
                />
                <View style={styles.actionContainer}>
                    <ActionButton style={styles.backButton} onPress={handleBack} title="Back" />
                    <ActionButton style={styles.registerButton} textColor={colors.white} onPress={handleRegister} title="Register" />
                </View>
            </View>
        </ScrollView>
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
    buttonPicture: {
        marginTop: spacing.component,
        color: colors.blue,
    },
    formPicture: {
        width: 250,
        height: 250
    },
    actionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.component,
        paddingBottom: 100
    },
    backButton: {
        width: '48%',
        backgroundColor: colors.redButton
    },
    registerButton: {
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

export default RegisterProfileScreen;