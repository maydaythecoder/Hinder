import { ThemedView } from '@/components/themed-view'
import React from 'react'
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native'

type UserType = {
    id: string,
    name: string,
    messages: string[]
};
const Users: UserType[] = [
    {
        id : '35b1f141-8f6e-4000-82d0-14534ceceecc',
    name: "Mr-Worldwide",
    messages: [
        "Hello, how are you?",
        "Don't forget our meeting tomorrow.",
        "Happy Birthday!"
    ]
},
{
    id : 'a2c4f141-1a2b-4000-82d0-14534ceab123',
    name: "Jane Doe",
    messages: [
        "Can you send me the report?",
        "Let's catch up over lunch.",
        "Congratulations on your promotion!"
    ]
}
];
export default function messages() {
 return (
    <ThemedView>
        <ol>
        {Users.map (user => (
            <li key={user.id}>
            {/* <Link href={`/messages/${user.id}`}> */}
            <Link href='/'>
                <p>{user.name}</p>
                <p>{user.messages[user.messages.length - 1]}</p>
            </Link>
                </li>
    ))}
    </ol>
        </ThemedView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    gap: 12,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1c1c1e',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#fff',
  },
  preview: {
    fontSize: 14,
    color: '#b0b0b0',
  },
})
