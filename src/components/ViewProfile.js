import { React } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { colors, spacing, fontSize} from '../styles/styles';
import getZodiac from '../styles/getZodiac';

const ViewProfile = ({navigation, user }) => {
    //get age
    let millisecondInYear = 1000 * 60 * 60 * 24 * 365;
    let userBirthday = new Date(user["birthday"]);
    const userBirthdayFormatted = new Date(userBirthday.getFullYear(), userBirthday.getMonth(), userBirthday.getDate())
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

export default ViewProfile;