import { cardData } from "@/Data/Cards";
import { chatData } from "@/Types/Chat";

// matches are just profiles from the deck for now, real matching comes post mvp
export const chatSeed: chatData[] = [
  {
    id: 'chat-amina',
    profile: cardData[0],
    messages: [
      { id: 'chat-amina-1', senderId: 'amina', text: 'Hey! We matched 🎉', sentAt: '9:12 AM' },
      { id: 'chat-amina-2', senderId: 'me', text: 'Hey Amina! I saw you like hiking, any trail recs?', sentAt: '9:15 AM' },
      { id: 'chat-amina-3', senderId: 'amina', text: 'Tons! There is a great ridge walk just outside the city.', sentAt: '9:21 AM' },
    ],
  },
  {
    id: 'chat-sofia',
    profile: cardData[2],
    messages: [
      { id: 'chat-sofia-1', senderId: 'me', text: 'Okay, top five albums. Go.', sentAt: 'Yesterday' },
      { id: 'chat-sofia-2', senderId: 'sofia', text: 'Bold of you to assume I can pick only five.', sentAt: 'Yesterday' },
    ],
  },
  {
    id: 'chat-noah',
    profile: cardData[3],
    messages: [
      { id: 'chat-noah-1', senderId: 'noah', text: 'Catan this weekend? I need a fourth player.', sentAt: 'Mon' },
    ],
  },
];
