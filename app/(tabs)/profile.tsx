import { Image } from 'expo-image'
import { StyleSheet, View, ScrollView } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Image
          source={{ uri: 'https://picsum.photos/600/900' }}
          style={styles.hero}
          contentFit="cover"
        />

        {/* Main Info */}
        <View style={styles.section}>
          <ThemedText type="title">Alex, 27</ThemedText>
          <ThemedText style={styles.bio}>
            Professional hater. Allergic to small talk. Swipe accordingly.
          </ThemedText>
        </View>

        {/* About */}
        <View style={styles.section}>
          <ThemedText type="subtitle">About</ThemedText>
          <ThemedText>
            Runs on sarcasm. Hates bad coffee, loud chewers, and “we should hang out sometime.”
          </ThemedText>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Interests</ThemedText>
          <View style={styles.tags}>
            {['Gym', 'Tech', 'Dark humor', 'Travel'].map(tag => (
              <View key={tag} style={styles.tag}>
                <ThemedText>{tag}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    width: '100%',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F1F1F1',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hate: {
    backgroundColor: '#ff3b30',
  },
  like: {
    backgroundColor: '#34c759',
  },
})
