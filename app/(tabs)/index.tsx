import { Image } from "expo-image";
import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Users } from "@/constants";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        {Users.map((user) => (
          <View key={user.id}>
            <Image source={user.pfp} style={styles.image} contentFit="cover" />

            <View style={styles.info}>
              <ThemedText type="title">{user.name}, {user.age}</ThemedText>
              <ThemedText type="default">
                {user.bio}
              </ThemedText>
            </View>
            <View style={styles.actions}>
              <Pressable style={[styles.button, styles.hate]}>
                <IconSymbol name="xmark" size={32} color="#fff" />
              </Pressable>

              <Pressable style={[styles.button, styles.like]}>
                <IconSymbol name="heart.fill" size={28} color="#fff" />
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F1F1F1",
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 420,
  },
  info: {
    padding: 16,
    gap: 6,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 24,
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
