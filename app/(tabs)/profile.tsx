import { Image } from "expo-image";
import { StyleSheet, View, ScrollView } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Users } from "@/constants";

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Users.map((Users) => (
          <View key={Users.id}>
            <Image
              source={Users.pfp}
              style={styles.hero}
              contentFit="cover"
            />

            <View style={styles.section}>
              <ThemedText type="title">
                {Users.name}, {Users.age}
              </ThemedText>
              <ThemedText style={styles.bio}>{Users.bio}</ThemedText>
              <View style={styles.section}>
                <ThemedText type="subtitle">About</ThemedText>
                <ThemedText>{Users.about}</ThemedText>
              </View>

              <View style={styles.section}>
                <ThemedText type="subtitle">Interests</ThemedText>
                <View style={styles.tags}>
                  {Users.interests.map((tag) => (
                    <View key={tag} style={styles.tag}>
                      <ThemedText>{tag}</ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    width: "100%",
    height: 420,
  },
  section: {
    padding: 16,
    gap: 8,
  },
  bio: {
    opacity: 0.8,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#F1F1F1",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#333",
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  hate: {
    backgroundColor: "#ff3b30",
  },
  like: {
    backgroundColor: "#34c759",
  },
});
