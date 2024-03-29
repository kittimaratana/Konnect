const zodiacs = [
    {
        "sign": "Capricorn",
        "dateStart": "2024-12-22",
        "dateEnd": "2025-01-20",
        "emoji": "♑"
    },
    {
        "sign": "Aquarius",
        "dateStart": "2025-01-21",
        "dateEnd": "2025-02-18",
        "emoji": "♒"
    },
    {
        "sign": "Pisces",
        "dateStart": "2025-02-19",
        "dateEnd": "2025-03-20",
        "emoji": "♓"
    },
    {
        "sign": "Aries",
        "dateStart": "2024-03-21",
        "dateEnd": "2024-04-20",
        "emoji": "♈"
    },
    {
        "sign": "Taurus",
        "dateStart": "2024-04-21",
        "dateEnd": "2024-05-20",
        "emoji": "♉"
    },
    {
        "sign": "Gemini",
        "dateStart": "2024-05-21",
        "dateEnd": "2024-06-21",
        "emoji": "♊"
    },
    {
        "sign": "Cancer",
        "dateStart": "2024-06-22",
        "dateEnd": "2024-07-22",
        "emoji": "♋"
    },
    {
        "sign": "Leo",
        "dateStart": "2024-07-23",
        "dateEnd": "2024-08-22",
        "emoji": "♌"
    },
    {
        "sign": "Virgo",
        "dateStart": "2024-08-23",
        "dateEnd": "2024-09-22",
        "emoji": "♍"
    },
    {
        "sign": "Libra",
        "dateStart": "2024-09-23",
        "dateEnd": "2024-10-22",
        "emoji": "♎"
    },
    {
        "sign": "Scorpio",
        "dateStart": "2024-10-23",
        "dateEnd": "2024-11-22",
        "emoji": "♏"
    },
    {
        "sign": "Sagittarius",
        "dateStart": "2024-11-23",
        "dateEnd": "2024-12-21",
        "emoji": "♐"
    }
];

const getZodiac = (birthdayInput) => {
    const birthday = new Date(birthdayInput);
    //default to first zodiac capricon
    let chosenZodiac = {
        sign: zodiacs[0].sign,
        emoji: zodiacs[0].emoji
    }

    for(let i = 1; i < zodiacs.length; i++) {
        let zodiac = {...zodiacs[i]}; //ensure no pointer assignment
        zodiac.dateStart = new Date (birthday.getFullYear() + zodiac.dateStart.substring(4));
        zodiac.dateEnd = new Date (birthday.getFullYear() + zodiac.dateEnd.substring(4));

        if(birthday >= zodiac.dateStart && birthday <= zodiac.dateEnd) {
            chosenZodiac = {
                sign: zodiac.sign,
                emoji: zodiac.emoji
            }
        }
    }

    return (chosenZodiac);
}

export default getZodiac;