import { React } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { colors, spacing, fontSize } from '../styles/styles';
import Header from '../components/Header';
import getZodiac from '../styles/getZodiac';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//view profile 
const ViewProfile = ({ navigation, user }) => {
    
    //get age of user and zodiac sign
    let millisecondInYear = 1000 * 60 * 60 * 24 * 365;
    let userBirthday = new Date(user["birthday"]);
    const userBirthdayFormatted = new Date(userBirthday.getFullYear(), userBirthday.getMonth(), userBirthday.getDate())
    userBirthdayFormatted.setHours(0, 0, 0, 0);
    const age = Math.floor((new Date() - userBirthdayFormatted) / millisecondInYear);
    let userZodiac = getZodiac(userBirthdayFormatted);

    //get interests in a list from string array
    let interestList = user["interests"].split(",")

    //display user detail data 
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.goBackContainer} onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="chevron-left" color={colors.gray} size={25} />
            </TouchableOpacity>
            <ScrollView>
                <Header />
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: `http://localhost:5001${user["picture"]}` }}
                    />
                </View>
                <Text style={styles.detailName}>{user["first_name"]}, {age}</Text>
                <View style={styles.detailBorder}>
                    <Text style={styles.detail}>📍 {user["city"]}</Text>
                </View>
                <Text style={styles.detailSubHeader}>About me 👋</Text>
                <Text style={styles.detail}>{user["bio"]}</Text>
                <Text style={styles.detailSubHeader}>My Horoscope Sign: </Text>
                <Text style={styles.detail}>{userZodiac.sign} {userZodiac.emoji}</Text>
                <Text style={styles.detailSubHeader}>Career 🏢</Text>
                <Text style={styles.detail}>Career: {user["career"]}</Text>
                <Text style={styles.detailSubHeader}>My hobbies include 🏈 🎭 🎹</Text>
                <View style={styles.interests}>
                {interestList.map((interest, index) => (
                    <Text style={styles.interest} key={index}>{interest.trim()}</Text>
                ))}
                </View>
                <Text style={styles.detailSubHeader}>My pet peeves are 🐶</Text>
                <Text style={styles.detail}>{user["pet_peeves"]}</Text>
            </ScrollView>
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        width: '100%',
        position: 'relative'
    },
    goBackContainer: {
        position: 'absolute',
        top: 35,
        zIndex: 1000
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
    },
    image: {
        alignItems: 'center',
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    detailName: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.nameIntro,
        color: colors.darkPurple,
        paddingTop: spacing.component,
        paddingBottom: spacing.gutter,
        fontWeight: '500'
    },
    detail: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.fields,
        paddingBottom: spacing.lineHeight
    },
    detailBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLightPurple,
        paddingBottom: spacing.component
    },
    detailSubHeader: {
        paddingHorizontal: spacing.margin,
        fontSize: fontSize.header,
        paddingBottom: spacing.gutter,
        paddingTop: spacing.component * 2,
        fontWeight: "500",
        color: colors.black
    },
    interests: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: spacing.margin,
    },
    interest: {
        backgroundColor: colors.purpleButton,
        padding: spacing.gutter,
        fontSize: fontSize.fields,
        marginRight: spacing.gutter,
        marginBottom: spacing.gutter,
        borderWidth: 2,
        borderRadius: 16,
        overflow: 'hidden'
    }
});

export default ViewProfile;