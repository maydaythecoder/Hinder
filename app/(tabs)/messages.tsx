import React from "react";
import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { ThemedView, ThemedText } from "@/components";
import { Image } from "expo-image";

type UserType = {
  id: string;
  name: string;
  messages: string[];
};

const Users: UserType[] = [
  {
    id: "35b1f141-8f6e-4000-82d0-14534ceceecc",
    name: "Mr-Worldwide",
    messages: [
      "Hello, how are you?",
      "Don't forget our meeting tomorrow.",
      "WHO HATES COFFEE!",
    ],
  },
  {
    id: "a2c4f141-1a2b-4000-82d0-14534ceab123",
    name: "Jane Doe",
    messages: [
      "Can you send me the report?",
      "Let's catch up over lunch.",
      "sarcasm is honestly cringe",
    ],
  },
];

export default function Messages() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.list}>
        {Users.map((user) => (
          <Link key={user.id} href="/" asChild>
<View style={styles.item}>
  <Image
    source={{ uri: 'https://picsum.photos/200' }}
    style={styles.image}
    contentFit="cover"
  />

  <View style={styles.text}>
    <ThemedText style={styles.name}>{user.name}</ThemedText>
    <ThemedText
      style={styles.preview}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {user.messages[user.messages.length - 1]}
    </ThemedText>
  </View>
</View>

          </Link>
        ))}
      </View>
    </ThemedView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  list: {
    gap: 12,
    marginTop: 32,
  },item: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
  paddingVertical: 14,
  paddingHorizontal: 16,
  borderRadius: 12,
  backgroundColor: '#f1f1f1',
},
image: {
  width: 40,
  height: 40,
  borderRadius: 20,
},
text: {
  flex: 1,           // ensures preview truncates properly
},
name: {
  fontSize: 16,
  fontWeight: '600',
},
preview: {
  fontSize: 14,
  color: '#555',
  opacity: 0.8,
},

});
