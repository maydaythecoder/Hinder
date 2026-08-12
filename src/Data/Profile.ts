import { profileData } from "@/Types/Profile";

// the logged in user, hardcoded until accounts exist
export const demoProfile: profileData = {
  id: 'me',
  name: 'Sam',
  age: 24,
  bio: 'Building apps and collecting hobbies. Currently into bouldering, film photography, and finding the best shawarma in town.',
  distanceKm: 0,
  interests: ['Climbing', 'Photography', 'Tech', 'Food'],
  imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
};
