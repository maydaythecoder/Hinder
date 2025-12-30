import { UserType } from "@/constants/Types/Users";

export const Users: UserType[] = [
  {
    id: "35b1f141-8f6e-4000-82d0-14534ceceecc",
    name: "Mr-Worldwide",
    age: 30,
    pfp: 'https://picsum.photos/600/900',
    messages: [
      "Hello, how are you?",
      "Don't forget our meeting tomorrow.",
      "WHO HATES COFFEE!",
    ],
    bio: "Just a regular guy who loves to travel and meet new people.",
    about: "Enjoys coding, gaming, and binge-watching sci-fi series.",
    interests: ['Traveling', 'Coding', 'Gaming', 'Sci-fi']
},
{
    id: "a2c4f141-1a2b-4000-82d0-14534ceab123",
    name: "Jane Doe",
    age: 25,
    pfp: 'https://picsum.photos/600/900',
    messages: [
        "Can you send me the report?",
        "Let's catch up over lunch.",
        "sarcasm is honestly cringe",
    ],
    bio: "Avid reader and coffee enthusiast. Always up for a good book recommendation.",
    about: "Loves hiking, photography, and exploring new cafes around the city.",
    interests: ['Reading', 'Hiking', 'Photography', 'Coffee']
},
{
    id: "b3d5f141-3c4d-5000-82d0-14534ceff456",
    name: "Alex Smith",
    age: 27,
    pfp: 'https://picsum.photos/600/900',
    messages: [
        "Happy Birthday!",
        "Are we still on for the weekend?",
        "I hate small talk",
    ],
    bio: "Professional hater. Allergic to small talk. Swipe accordingly.",
    about: "Runs on sarcasm. Hates bad coffee, loud chewers, and “we should hang out sometime.”",
    interests: ['Gym', 'Tech', 'Dark humor', 'Travel']
  }
];
