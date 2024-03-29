import { useState, useEffect, React } from "react";
import { View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Button, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors, spacing, fontSize, form } from '../styles/styles';
import getZodiac from '../styles/getZodiac';
import ActionButton from '../components/ActionButton';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import Header from '../components/Header';


const ViewProfileScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const userResponse = await axios.get("http://localhost:5001/users/", {
                headers: {
                    authorization: `Bear ${token}`
                }
            });

            setUser(userResponse.data);
            setIsLoading(false);
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

    //get age
    let millisecondInYear = 1000 * 60 * 60 * 24 * 365;
    let userBirthday = new Date(user["birthday"]);
    const userBirthdayFormatted = new Date(userBirthday.getFullYear(), userBirthday.getMonth(), userBirthday.getDay())
    userBirthdayFormatted.setHours(0, 0, 0, 0);
    const age = Math.floor((new Date() - userBirthdayFormatted) / millisecondInYear);
    let userZodiac = getZodiac(userBirthdayFormatted);

    //get interests
    let interestList = user["interests"].split(",")

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.goBack}>X</Text>
                </TouchableOpacity>
                <Text style={styles.detailName}>My name is {user["first_name"]} 👋</Text>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: `http://localhost:5001${user["picture"]}` }}
                    />
                </View>
                <Text style={styles.detail}>Age: {age}</Text>
                <Text style={styles.detail}>City: {user["city"]}</Text>
                <Text style={styles.detail}>Horoscope: {userZodiac.sign} {userZodiac.emoji}</Text>
                <Text style={styles.detail}>Career: {user["career"]}</Text>
                <Text style={styles.detailSubHeader}>About me:</Text>
                <Text style={styles.detail}>{user["bio"]}</Text>
                <Text style={styles.detailSubHeader}>My hobbies include</Text>
                {interestList.map((interest,index) => (
                    <Text style={styles.detail}>• {interest}</Text>
                ))}
                <Text style={styles.detailSubHeader}>My pet peeves are</Text>
                <Text style={styles.detail}>{user["pet_peeves"]}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightPurple,
        width: '100%',
    },
    detailName: {
        textAlign: 'center',
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.nameIntro,
        paddingVertical: spacing.component
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: spacing.margin,
        paddingBottom: spacing.component
    },
    image: {
        alignItems: 'center',
        width: 340, //335
        height: 340
    },
    detail: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.fields,
        paddingBottom: spacing.lineHeight
    },
    detailSubHeader: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.header,
        paddingBottom: spacing.component,
        paddingTop: spacing.component*2,
        fontWeight: "500"
    },
    goBack: {
        textAlign: 'right',
        paddingHorizontal: spacing.margin,
        paddingTop: spacing.margin
    },
});

export default ViewProfileScreen;