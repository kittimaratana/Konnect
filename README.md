# Project Title
Konnect

## Installation Instructions

- Server:
	1. Terminal: npm install
	2. SQL: Create DATABASE konnect
	3. Modify .env.sample file to .env and update credentials
	4. Terminal: npx knex migrate:latest
	5. Terminal: npx knex seed:run
	6. Terminal: npm start

- Client:
	1. Terminal: npm install 
	2. After installing Simulator, 
        - Terminal: npm start
        - Terminal: Press i 
            - (iPhone SE (3rd generation) - iOS 17.2)
	3. In the database you can utilize email and password for login credentials in user table
    4. You can also register a new account if that's preferred 

## Overview

Say hi to Konnect, the innovative networking app that fosters genuine connections through simple clicks. Say no more to superficial interactions, Konnect prioritizes meaningful and authentic connections, by matching individuals based on shared interests. Say goodbye to awkward interactions, hello to lifelong connections.

### Problem

The need to belong and fit in is more crucial than ever. With the rise of technology and social media, coupled with global events like the COVID pandemic and modern work lifestyles, people are experiencing higher loneliness than ever. The Meta-Gallup survey found that 1 in 4 adults worldwide has reported feeling lonely. While, there are applications like Bumble BFF, Linkedin and MeetUp, it's often challenging to establish lasting friendships with individuals who have different interests and can feel inauthentic. There are also "hubs" like Monday Girl and activity clubs, such as sports leagues, where you can meet others. However, these opportunities often entail upfront costs to join. 

### User Profile

In the first iteration of my application, my target audience are Gen Z and Millenial users who are 18 years old or over:
    - looking to meet people in their current location 
    - looking to meet individuals with similar interests and bond over participating in these activities
    - participate in new activites they have been meaning to try with others

### Features 

- Important Mentions: 
    - Authentication is not a priority for this iteration, however JWT tokens are used to ensure that user credentials are correct to pull server data that matches user credentials on database side (password not encrypted currently)
    - Message tab is future focus, however high level UI design is shown

- Login to my account
- Register for an account
- View current account profile/details 
- Logout of my account

- View events that I am hosting
- View events that I am going to or have pending status to join event
- Create New Event
- View specific event details that I am attending/pending/hosting:
    - If I am the host, I would like to know:
        - What are the event details
        - Which guests are going and view their details
        - Which guests do I still need to approve/reject and whether I am compatible with them
    - If I am a guest, I would like to know:
        - What are the event details
        - Which other guests are going and view their details
        - If I have not been accepted yet and can longer attend, I would like to cancel the request to join

- Explore new events and see event details
- View event host user details
- State whether I am uninterested or interested in joining the event

## Implementation

### Tech Stack

- React
- React Native
- Expo
- MySQL
- Express
- Client libraries: 
    - react
    - react-router
    - react-native (i.e., user interface components like View, uuid, DataTimePicker, useNavigation, gesture-handler, stacks/navigation)
    - expo (i.e., MaterialCommunityIcons, ImagePicker)
    - axios
    - asyncstorage for authentication
- Server libraries:
    - knex
    - express
    - jwt for authentication 
    - multer for image handling 
    - faker to import seed data 

### APIs

- no api used, profile data from faker library and pexels free instock photos

### Sitemap 

- Hierarchy (With brief description)
    - Intro Screen: Provides options to login or register for new account
    - Login Screen: Login using existing user credentials 
    - Register Screen: New account where user inputs credentials used to login in the future 
    - Register Profile Screen: User inputs comprehensive profile details like picture and bio
    - Main 
        - Home Tab
            - Home Screen: View upcoming and hosting events
            - Create Event Screen: Create new event
            - View Event Screen: View existing event details 
            - View Other Profile Screen: View guest or host profile
        - Explore Tab
            - Explore Screen: View a new event that user has not seen (note: swipe left means not interested)
            - View Other Profile Screen: Clicking on image in explore screen provides event host profile
        - Message Tab
            - Message Screen: Basic UI (Future Implementation)
        - Setting Tab
            - Settings Screen: Provides options such as logging out or viewing user profile
            - View Profile Screen: View user profile

### Mockups


https://www.figma.com/file/aZCCzFtmRb08MxrzvP81i8/Konnect?type=whiteboard&node-id=0%3A1&t=49G8htkS27Nn0rD7-1

### Data

https://www.figma.com/file/aZCCzFtmRb08MxrzvP81i8/Konnect?type=whiteboard&node-id=0%3A1&t=49G8htkS27Nn0rD7-1

### Endpoints

**POST /auth/login** 

- Login a user 

- Parameters:
    - email: user email
    - password: user password

Response: 
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4NTNlNGU2LWNkYWMtNDAzNS1iMzMxLThjMDFjOWE3MTc3OCIsImlhdCI6MTcxMTkxOTE2NywiZXhwIjoxNzEyMDA1NTY3fQ.8E2O6Faw_9OVuWIM8_CsubiScR75S2POs3WlQJ_oNS0"
}
```

**POST /auth/register** 

- Create a new account 

- Parameters:
    - first_name: user first name
    - last_name: user last name
    - email: user email
    - password: user password

Response: 
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4NTNlNGU2LWNkYWMtNDAzNS1iMzMxLThjMDFjOWE3MTc3OCIsImlhdCI6MTcxMTkxOTE2NywiZXhwIjoxNzEyMDA1NTY3fQ.8E2O6Faw_9OVuWIM8_CsubiScR75S2POs3WlQJ_oNS0"
}
```

**Get /users**

- Get user profile details 

- Parameters:
    - token: JWT of the logged in user

Response: 
```
{
    "id": "076d6267-3110-46c2-9055-c8472801c78d",
    "first_name": "Sandy",
    "last_name": "Burley",
    "email": "sandy.burley@gmail.com",
    "gender": "Female",
    "birthday": "2000-01-01T05:00:00.000Z",
    "career": "Software Engineer",
    "city": "Toronto",
    "interests": "Singing, travelling, sports",
    "picture": "/images/0e09fea2-6bcc-4dd6-8cb6-d3e6473875df.jpg",
    "bio": "Hello this is me, I love to go on adventures and something something something",
    "pet_peeves": "Slow walkers"
}
```

**PUT /users** 

- Update user details with comprehensive details like picture and bio added
- Client end will convert user information into formData as it makes ingesting image data easier and send the formData as the parameter
- Note: picture id and user id are different for new users (seed data same)

- Parameters: 
    - gender: user gender (i.e., Female, Nonbinary)
    - birthday: user birthday entered through date spinner
    - career: user career
    - city: user city
    - interests: user interests
    - picture: user picture uploaded in jpg format (no additional tests put in this iteration for other file imports)
    - bio : user story and biography they want to share with others
    - pet_peeves: user pet peeves (i.e., Slow Walkers)
    - picture_name: name of picture that is generated automatically using uuid on client end
    - token: JWT of the logged in user

Response: 
```
{
    "id": "062e001f-b458-44cf-a68c-1f6198910e43"
    "first_name": "Kittima",
    "last_name": "Ratana-Rueangsri",
    "email": "kittima.ratana@gmail.com",
    "gender": "Female",
    "birthday": "1997-02-28T05:00:00.000Z",
    "career": "Data Scientist -> Software Engineering",
    "city": "Toronto",
    "interests": "Singing, Fitness, Self care, Travelling",
    "picture": "/images/062e001f-b458-44cf-a68c-1f6198910e43.jpg",
    "bio": "Hello this is me, I love to go on adventures and something something something",
    "pet_peeves": "Flakiness"
}
```

**Get /users/:userIid** 

- Get user profile details given user id

- Parameters:
    - token: JWT of the logged in user
    - user_id: userId of the user we want to get profile details for

Response: 
```
{
    "id": "062e001f-b458-44cf-a68c-1f6198910e43",
    "first_name": "Evelyn",
    "last_name": "Fisher",
    "email": "Lillie48@yahoo.com",
    "gender": "Female",
    "birthday": "2006-07-11T04:00:00.000Z",
    "career": "Dynamic Brand Analyst",
    "city": "Larsonfort",
    "interests": "Mushroom hunting,Genealogy,Pottery",
    "picture": "/images/062e001f-b458-44cf-a68c-1f6198910e43.jpg",
    "bio": "streamer, film lover, entrepreneur 🚱",
    "pet_peeves": "Interrupting while speaking"
}
```

**GET /events**

- Get an event that user has never seen before to display on explore page
- Event that are full will not appear to user

- Parameters: 
   - token: JWT of the logged in user

Response: 
```
{
    "id": 1,
    "user_id": "f367b301-a9b4-43d8-b5ff-eb5519aaf841",
    "date": "2024-04-15T04:00:00.000Z",
    "location": "Aquarium store or public aquariums",
    "max_guests": 3,
    "total_guests": 1,
    "description": "Learn about aquatic ecosystems together at aquarium stores or enjoy marine life at public aquariums."
}
```

**POST /events**

- User posts a new event they are hosting

- Parameters:
    - date: date of event
    - location: location of event
    - max_guests: number of attendees + host that can attend event
    - description: event details
    - token: JWT of the logged in user

Response:
```
{
    "id": 13,
    "user_id": "076d6267-3110-46c2-9055-c8472801c78d",
    "date": "2024-01-01T05:00:00.000Z",
    "location": "Taylor Swift Era Concert",
    "max_guests": 2,
    "total_guests": 1,
    "description": "I have an extra Taylor Swift ticket if any Swiftie would want to join"
}
```

**GET /events/:eventId**

Get attendance list of event for attendees with status going, pending and hosting

- Parameters:
    - event_id: event ID 
    - token: JWT of the logged in user

Response: 
```
[
    {
        "id": "162f0d54-f5c6-4a1d-be4b-534c79639b8b",
        "first_name": "Jennifer",
        "last_name": "Runolfsdottir",
        "picture": "/images/162f0d54-f5c6-4a1d-be4b-534c79639b8b.jpg",
        "attendence_id": 4,
        "event_id": 4,
        "status": "Hosting"
    },
    {
        "id": "6a4fbf26-1676-4775-b20c-6c7d06be3175",
        "first_name": "Dell",
        "last_name": "Klein",
        "picture": "/images/6a4fbf26-1676-4775-b20c-6c7d06be3175.jpg",
        "attendence_id": 5,
        "event_id": 4,
        "status": "Going"
    },
    {
        "id": "6f72b094-75da-438f-8566-3f22b0686afc",
        "first_name": "Chet",
        "last_name": "Weber",
        "picture": "/images/6f72b094-75da-438f-8566-3f22b0686afc.jpg",
        "attendence_id": 6,
        "event_id": 4,
        "status": "Pending"
    }
]
```

**POST /events/:eventId**

Post event attendance status either pending or uninterested based on user's interaction on explore page (swipe left/request to join)

- Parameters:
    - event_id: event ID (int foreign key)
    - status: Pending or Uninterested
    - token: JWT of the logged in user

Response: 
```
{
    "id": 58,
    "event_id": 4,
    "status": "Pending",
    "guest_user_id": "076d6267-3110-46c2-9055-c8472801c78d"
}
```

**PUT /events/:eventId**

- Host has decided whether to accept "Going" or decline "Rejected" event request 
- User has decided to "Cancel" request when they have not been accepted yet

- Parameters:
    - attendance_id: attendance ID of user event
    - event_id: event ID 
    - status: Going, Rejected or Cancelled
    - user_id: user id with status change
    - token: JWT of the logged in user

Response: 
```
{
    "id": 58,
    "event_id": 4,
    "status": "Going",
    "guest_user_id": "076d6267-3110-46c2-9055-c8472801c78d"
}
```

**GET /events/:eventId/details**

- Get event details given event id

- Parameters: 
    - token: JWT of the logged in user

Response: 
```
{
    "id": 8,
    "user_id": "2b069300-a587-4f8f-9c61-13494737f224",
    "date": "2024-04-06T04:00:00.000Z",
    "location": "Film school or video production studios",
    "max_guests": 7,
    "total_guests": 1,
    "description": "Create cinematic masterpieces together at film schools or explore video production studios for creative projects."
}
```

**GET /events/user/upcoming-events**

- Get a list of events that user has status pending or going

- Parameters: 
    - token: JWT of the logged in user

Response: 
```
[
    {
        "id": 4,
        "user_id": "162f0d54-f5c6-4a1d-be4b-534c79639b8b",
        "date": "2024-04-14T04:00:00.000Z",
        "location": "Candle making workshops or craft fairs",
        "max_guests": 8,
        "description": "Craft aromatic candles together at candle making workshops or explore handmade candles at craft fairs.",
        "status": "Going",
        "picture": "/images/162f0d54-f5c6-4a1d-be4b-534c79639b8b.jpg"
    }
]
```

**GET /events/user/hosting-events**

- Get a list of events that user is hosting and whether there are incoming requests from others to join event

- Parameters: 
    - token: JWT of the logged in user

Response: 
```
[
    {
        "id": 1,
        "user_id": "f367b301-a9b4-43d8-b5ff-eb5519aaf841",
        "date": "2024-04-15T04:00:00.000Z",
        "location": "Aquarium store or public aquariums",
        "max_guests": 3,
        "description": "Learn about aquatic ecosystems together at aquarium stores or enjoy marine life at public aquariums.",
        "picture": "/images/f367b301-a9b4-43d8-b5ff-eb5519aaf841.jpg",
        "pendingStatus": true
    }
]
```

### Auth

- JWT auth
    - Store JWT in AsyncStorage (currently not priority to remove token once user logged out for this iteration)
    - Use token to help pull specific data from server based on credentials

## Roadmap

- Shorten list of original roadmap written to provide quicker overview

    - Look into Expo/React Native

    - Backend Focus: 
        - Create server and deploy 
            -Pull mock data, populate databases
            -Create routes

        - Create client and deploy
            -folder structure, routes, pages connections

        - Implement all backend responses

        - Connect frontend pages to backend and ensure data is showing on correct pages

    - Frontend Focus:
        - Implement authentication frontend design and basic form validation
            -Login, Register, Register Profile

        - Implement Konnect header and Tab navigation bottom design

        - Implement settings and message tabs frontend design
            - Settings, View Profile, Message (Placeholder design)

        - Implement Explore Tab frontend design
            - Includes posting attendance status, refreshing new data, routing to view profile and alert view if requesting to join

        - Implement Home Tab frontend design
            - Upcoming event and hosting event view
            - Create new event screen and basic validation
            - View specific event screen, displaying different button types based on whether user is host or guest
            - Put attendance status to server based on host or guest credentials and action chosen

    - Testing Phase
        - Add comprehensive form validation
        - Increase UI of each screen
        - Fix warning messages that console displays
        - Bug fixes
        - Update README File

    - Deploy Phase
        - Create presentation deck
        - Demo Day

## Nice-to-haves

- Settings Tab:
    - edit profile (instead of view profile)
    - ability to choose distance and randomness of friends
    - ability to incorporate machine learning models to pair friendships 
    - priority of event interests shown to users
    - forget password option
    - adding multiple pictures to mobile
    - potentially have more bio options
    - password hashing
    - proper authentication steps
    - testing out character limit for each form section

- Message Tab:
    - implementing message tab
    - incorporating push notifications when new message is sent

- Events/ Homepage Tabs:
    - validating users cannot be added to same event at the same time
    - adding time field (not just date)
    - ensuring events is next couple of weeks
    - incorporating push notifications when there are new status to event
    - removing past events 

- Overall Project:
    - gaining more knowledge how to scale if there are a lot of users
    - increasing security of application
    - making overall UI more visually pleasing
    - add more mobile guesture features 
    - make compatable to other devices than just iphone 3
    - character limit validation in the future
