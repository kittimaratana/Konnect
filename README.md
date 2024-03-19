# Project Title
Konnect

## Overview

Say hi to Konnect, the innovative networking app that fosters genuine connections through simple clicks. Say no more to superficial interactions, Konnect prioritizes meaningful and authentic connections, by matching individuals based on shared interests. Say goodbye to awkward interactions, hello to lifelong connections.

### Problem

The need to belong and fit in is more crucial than ever. With the rise of technology and social media, coupled with global events like the COVID pandemic and modern work lifestyles, people are experiencing higher loneliness than before. The Meta-Gallup survey found that 1 in 4 adults worldwide has reported feeling lonely. While, there are applications like Bumble BFF, Linkedin and MeetUp, it's often challenging to establish lasting friendships with individuals who have different interests and can feel inauthentic. There are also "hubs" like Monday Girl and activity clubs, such as sports leagues, where you can meet others. However, these opportunities often entail upfront costs to join. 

### User Profile

In phase one, my target audience are Gen Z and Millenial users:
    - looking for people close to their current location to meet
    - looking to meet individuals with similar interests or goals

### Features

- Ability to match with users who are similar to you (you define your interests and location)
- Ability to post events or request to join event and owner accepts/closes posting 
- Ability to view other people's profile

## Implementation

### Tech Stack (Explore)

- React
- React Native
- Expo
- MySQL
- Express
- Client libraries: 
    - react
    - react-router
    - axios
- Server libraries:
    - knex
    - express
    - bcrypt for password hashing

### APIs

- https://randomuser.me/ 
- contains city, email, username, password, image, age 
- no api_key required

### Sitemap 

- Login/ Register
- Profile Details
- Home Page (Events)
    - Request to Join 
- View Events 
- View List of Activities (Medium)
- Setting (Very Basic Level)

4 Tabs (See mockup)
-Home Page
-Events
-Activity
-Setting

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.
--https://www.figma.com/file/aZCCzFtmRb08MxrzvP81i8/Konnect?type=whiteboard&node-id=0%3A1&t=49G8htkS27Nn0rD7-1

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. 

userCredentials:
id (primary, unique)
-name
-email
-password
-token_id
-gender
-birthday 
-career
-city
-interests: store in array string
-pictures (one for now in link)
-bio
-pet peeves

eventDetails
-eventId (primary, unique)
-hostuserId (foreign)
-date
-time
-location
-maxGuest
-totalGuest
-description

userAttendance (includes host):
-attendanceId (primary key)
-eventId (foreign key)
-status (approved/declined/cancelled/pending/host)
-guestuserId

### Endpoints

**GET /user/login**

-Login a user 

- Parameters:
    - email: varchar but requires email validation
    - password: varchar but contains validation

Response: 

{
    {
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
}

**POST /user/register**

-Create a new account 

- Parameters:
    - name: varchar but name of user
    - email: varchar but requires email validation
    - password: varchar but contains validation

- default placeholders:
    - gender: varchar with gender placeholder "No gender"
    - birthday: date with birthday placeholder "2000-01-01"
    - career: varchar with placeholder "No career"
    - city: varchar with placeholder "No city"
    - interests: varchar array string with placeholder "["eating, fitness]"
    - "picture": varchar link with placeholder random profile image
    - "bio" : varchar with placeholder "No bio"
    - pet peeves: varchar with placeholder "No pet peeves"

Response: 

{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}

**Get /user/:userIid**

-Get user details (own users or others)

- Parameters:
    - id: userId not token as we can get other users too
    - token: JWT of the logged in user

Response: 

{
    "id": 1
    "name": "Kittima",
    "email": "kittima.ratana@gmail.com",
    "password": "password",
    "gender": "Female",
    "birthday": "1997-02-28",
    "career": "Career Transitioning",
    "city": "Toronto",
    "interests": "["singing", "fitness", "self care", "travelling"]",
    "picture": <link>,
    "bio": "Something something something",
    "pet peeves": "flaky, late, and passive agressive people"
}

**PUT /user/:userId**

-Update user details to register and update as other fields will be filled in

- Parameters:
    **- id: existing id of user (int)**
    - name: existing name of user (varchar)
    - email: existing email with validation (varchar)
    - password: existing password (varchar)
    - gender: gender (varchar)
    - birthday: birthday (date)
    - career: career (varchar)
    - city: city (varchar)
    - interests: interests (string array)
    - "picture": image (varchar)
    - "bio" : bio (varchar)
    - pet peeves: petpeeves (varchar)
    - token: JWT of the logged in user

Response: 

{
    "id": 1
    "name": "Kittima",
    "email": "kittima.ratana@gmail.com",
    "password": "password",
    "gender": "Female",
    "birthday": "1997-02-28",
    "career": "Career Transitioning",
    "city": "Toronto",
    "interests": "["singing", "fitness", "self care", "travelling"]",
    "picture": <link>,
    "bio": "Something something something",
    "pet peeves": "flaky, late, and passive agressive people"
}

**GET /user/:userId/events-hosted**

-Get user events

- Parameters: 
    **- id: existing id of user (int)**
    - token: token of user 

Response: 

[
{
    "eventId": 1,
    "hostuserId": 2,
    "date": "2024-03-01",
    "time": 8:00 pm,
    "location": "Terroni",
    "maxGuests": 8,
    "totalGuests" 7,
    "description": "New to town",
    "guestStatus": "New Requests" //sql count if possible with eventId where eventid has "Pending Requests"
}
]

**GET /user/:userId/events-joining**

-Get events that user is currently in status pending or going currently 

- Parameters: 
    **- id: existing id of user (int)**
    - token: token of user 

Response: 

[
{
    "eventId": 1,
    "hostuserId": 2,
    "date": "2024-03-01",
    "time": 8:00 pm,
    "location": "Terroni",
    "maxGuests": 8,
    "totalGuests" 7,
    "description": "New to town",
    "status": "Going"
}

{
    "eventId": 2,
    "hostuserId": 3,
    "date": "2024-05-01",
    "time": 8:00 pm,
    "location": "Drinks",
    "maxGuests": 10,
    "totalGuests" 2,
    "description": "Fun night out",
    "status": "Pending"
}
]

**GET /events**

- Get list of events to display to user that user is not part of for events page

- Parameters: 
    **- id: user id of user we are looking at (do we need it if token is stored?)**
    - token: token of user 
    
Join eventDetails with userCredentials not having event userId in userAttendance totalGuest not equal to maxGuest

Response: 
[
    {
    "id": 2 (joined with hostUserId)
    "name": "Erik",
    "eventId": 2,
    "date": "2024-03-01",
    "time": 8:00 pm,
    "location": "Terroni",
    "maxGuests": 8,
    "totalGuest": 1,
    "description": "New to town",
    }
]

**POST /event**

- Parameters:
    - token: token of user (varchar)
    - date: date of event (date)
    - time: time of event (12 am -> 11:59 pm) (date)
    - location: location of meet up (varchar)
    - maxGuest: int (min 2) (int)
    - totalGuest: start with 1 (int)
    - description: event details (varchar)

Response (1): 

{
    "eventId": 1,
    "hostuserId": 2,
    "date": "2024-03-01",
    "time": 8:00 pm,
    "location": "Terroni",
    "maxGuests": 8,
    "totalGuest": 1,
    "description": "New to town",
}

Reponse (2):

{
    "attendanceId": 1,
    "eventId": 1,
    "status": "Host",
    "guestId": 1
}

**POST /event/:eventId**

Request to join event

- Parameters:
    - token: token of user (varchar)
    - eventId: event ID (int foreign key)

Response: 

{
    "attendanceId": 1,
    "eventId": 1,
    "status": "Pending",
    "guestId": 2
}

**PUT /event/:eventId**

Host or user have changed state of status

Confirm can guest id be same as token id

- Parameters:
    - token: token of user (varchar)
    - eventId: event ID (int)
    - status: what was the status of event (varchar)

Response (1) Change state of user

{
    "attendanceId": 1,
    "eventId": 1,
    "status": "Cancelled" or "Approved" or "Rejected",
    "guestId": 1
}

Reponse (2) Increase Number of guests (7 to 8 totalGuest)

{
    "eventId": 1,
    "hostuserId": 2,
    "date": "2024-03-01",
    "time": 8:00 pm,
    "location": "Terroni",
    "maxGuests": 8,
    "totalGuest": 8,
    "description": "New to town",
}

Change everyone who is Pending to Rejected if it is full


{
    "attendanceId": 1,
    "eventId": 1,
    "status": "Rejected"
    "guestId": 2
}

{
    "attendanceId": 1,
    "eventId": 1,
    "status": "Rejected"
    "guestId": 3
}


### Auth

- JWT aut
    - Store JWT in localStorage, remove when a user logs out

## Roadmap

- Internal Deadlines: 

- Sprint 1 - Ensuring that all data is shown properly for each page (target Thursday 21st, latest weekend)

    - Look into Expo/React Native 

    - Create server and deploy
        - Pull mock data from api as seed data
        - Populate databases 
        - express project with routing

    - Create client and deploy 
        - folder structure, routes, pages connections

    - Feature: Implement all backend response types
        - Implement all end points and test on Postman

    - Feature: Connect frontend pages to backend
        - Design can be ugly, just want to ensure that all frontend pages display data from server

- Sprint 2 - FrontEnd Design (target Thursday 28th, latest Friday)

    - Front-End Feature: Create main page (/)

    - Front-End Feature: Create account page (/account)
        - Implement front end design 
        - Implement form validation

    - Front-End Feature: Create interests page (interest)
        - Implement front end design and form PUT and POST to input interests
        - Implement form validation

    - Front-End Feature: Login account page (/login)
        - Implement front end design
        - Implement form validation

    - Front-End Feature: Footer component
        - Format icon (navigation footer component) and call it from each page as some pages do not have footer

    - Front-End: View User details component
        - Implement front end design 
        - Used in various pages including displaying settings, viewing new user profile in explore, and view user profile on Event page
        - Depending on prop pass down from previous page (UI may slightly differ)

    - Front-End Feature: Events component (/events)
        - Implement front end design
        - Implement events, event components passing down prop event id and host id to view event details

    - Front-End Feature: View Event page (/event/id)
        - Implement front end design
        - Based on the prop given display's different data and have different navigation options
            - If event is hosted by user, then they can navigate to see pending requests
            - If user is going to event, there is no navigation just word "Going"
            - If host has not accepted user event, user can be navigated to cancel request
            - If user is just viewing the event sent in their search feed, user can be navigated to request to join

    - Front-End Feature: Request to Join/Cancel Pending Event page (/event/id/action)
        - Implement front end design
        - Based on the prop given whether they want to join or cancel event, a different form will appear (request to join, cancel request)
        - They can cancel/undo which navigates back 1 page
        - If they ever confirm the action, they are navigated back to main page afterwards

    - Front-End Feature: Requests page (/event/id/requests)
        - Implement front end design
        - Contain, requests and request components that to display each requested user

    - Front-End Feature: Create event page (/create)
        - Implement front end design
        - Implement form validation
        - Both navigates back to Events page

    - Front-End Feature: Settings page
        - Edit profile -> Link to create interest page
        - Logout -> Just logs out
    
- Coding Sprint Day 2

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

- settings:
    - edit profile (instead of view profile)
    - ability to choose distance and randomness of friends
    - ability to incorporate AI to pair friendships (first to showcase skills !!!)
    - priority of event interests
    - forget password
    - adding multiple pictures to mobile
    - potentially have more bio options
    - password hashing

- message tab:
    - chose not to work right now but can be between host and user

- events/ homepage:
    - users cannot add event to multiple time slots
    - events need to be next couple of weeks not too much after

