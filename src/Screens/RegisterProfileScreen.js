import { useState, React } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors, spacing, fontSize, form } from '../styles/styles';
import ActionButton from '../components/ActionButton';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

const RegisterProfileScreen = () => {
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

    //if user clicks back button
    const handleBack = () => {
        navigation.goBack();
    }

    //if birthday was provided then the date picker will be hidden
    const onChange = (event, selectedDate) => {
        setShowDatePicker(false);
        setBirthday(selectedDate);
    };

    //check if user is 18 or older
    const validBirthday = (birthday) => {
        const currentDate = new Date();
        const millisecondsToYear = 1000 * 60 * 60 * 24 * 365;
        if((currentDate - birthday)/millisecondsToYear < 18) {
            return (false)
        }
        return (true)
    }

    //currently no picture request right now but this module from react native expo helps obtain picture from mobile that is exported to server
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: true, aspect: [4, 3], quality: 1,});

        if (!result.canceled) {
            setPicture(result.assets[0].uri);
        }
    };

    //check user input validation
    //future implementation: add additional validation for city, additional picures 
    const handleRegister = async (event) => {
        event.preventDefault();
        setHasSubmit(true);
        let fieldError = false;

        if ([gender, birthday, career, city, interests, picture, bio, petPeeves].some(field => field === "")) {
            fieldError = true;
        }

        if (!validBirthday(birthday)) {
            fieldError = true;
        }

        //convert date to format server looks for and add attributes to form data to handle image export
        const options = {
            year: 'numeric', 
            month: '2-digit',
            day: '2-digit'
        }

        const pictureName = `${uuid.v4()}.jpg`;

        const formData = new FormData();

        formData.append('picture', {
            name: pictureName,
            uri: picture,
            type: 'image/jpg'
        })
        formData.append('gender', gender);
        formData.append('birthday', birthday.toLocaleDateString('en-CA', options));
        formData.append('career', career);
        formData.append('city', city);
        formData.append('interests', interests);
        formData.append('bio', bio);
        formData.append('pet_peeves', petPeeves);
        formData.append('picture_name', pictureName);

        if (fieldError === false) {
            try {
                const token = await AsyncStorage.getItem('token');
                await axios.put("http://localhost:5001/users", formData, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        authorization: `Bear ${token}`
                    }
                });

                setSuccess(true);
                setError(null);
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
                    placeholder="i.e., Female, Nonbinary"
                />
                {hasSubmit && gender === "" ? <Text style={styles.errorMessage}>*Please enter your gender</Text> : null}
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
                {hasSubmit && !validBirthday(birthday) ? <Text style={styles.errorMessage}>*You must be 18 years old or over to use the app</Text> : null}
                <Text style={form.input}>Career</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && career === "" ? styles.error : null,
                ]}
                    value={career}
                    onChangeText={(text) => setCareer(text)}
                    placeholder="i.e., Software engineer, Student"
                />
                {hasSubmit && career === "" ? <Text style={styles.errorMessage}>*Please enter your career</Text> : null}
                <Text style={form.input}>City</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && city === "" ? styles.error : null,
                ]}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                    placeholder="i.e., Toronto"
                />
                {hasSubmit && city === "" ? <Text style={styles.errorMessage}>*Please enter your city</Text> : null}
                <Text style={form.input}>Interests</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && interests === "" ? styles.error : null,
                ]}
                    value={interests}
                    onChangeText={(text) => setInterests(text)}
                    placeholder="i.e., Singing, Fitness, Travelling..."
                />
                {hasSubmit && interests === "" ? <Text style={styles.errorMessage}>*Please enter your interests</Text> : null}
                <Text style={form.input}>Picture</Text>
                {picture && 
                    <Image source={{uri: picture}} style={styles.formPicture} />
                }
                <Text style={styles.buttonPicture} onPress={pickImage}>New Picture</Text>
                {hasSubmit && !picture ? <Text style={styles.errorMessage}>*Please add a picture</Text> : null}
                <Text style={form.input}>Bio</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && bio === "" ? styles.error : null,
                ]}
                    value={bio}
                    onChangeText={(text) => setBio(text)}
                    placeholder="Add your story"
                />
                {hasSubmit && bio === "" ? <Text style={styles.errorMessage}>*Please enter your bio</Text> : null}
                <Text style={form.input}>Pet Peeves</Text>
                <TextInput style={[
                    form.field,
                    hasSubmit && petPeeves === "" ? styles.error : null,
                ]}
                    value={petPeeves}
                    onChangeText={(text) => setPetPeeves(text)}
                    placeholder="i.e., Slow Walkers"
                />
                {hasSubmit && petPeeves === "" ? <Text style={styles.errorMessage}>*Please enter your pet peeves</Text> : null}
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
    errorInputBorder: {
        borderWidth: 1,
        borderColor: colors.redError
    },
    errorMessage: {
        marginTop: spacing.component,
        color: colors.redError,
        width: '100%',
        textAlign: 'left'
    }
});

export default RegisterProfileScreen;