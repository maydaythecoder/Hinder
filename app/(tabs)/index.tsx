import { Image } from 'expo-image'
import { StyleSheet, View, Pressable } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { Link } from 'expo-router'

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://picsum.photos/600/900' }}
          style={styles.image}
          contentFit="cover"
        />

        <View style={styles.overlay}>
          <ThemedText type="title" style={styles.name}>
            Alex, 27
          </ThemedText>
          <ThemedText style={styles.bio}>
            Certified hater. Bad vibes detector. Swipe wisely.
          </ThemedText>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable style={[styles.actionButton, styles.hate]}>
          <IconSymbol name="xmark" size={32} color="#fff" />
        </Pressable>

        <Link href="/messages" asChild>
          <Pressable style={[styles.actionButton, styles.like]}>
            <IconSymbol name="heart.fill" size={28} color="#fff" />
          </Pressable>
        </Link>
      </View>
    </ThemedView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  name: {
    color: '#fff',
    marginBottom: 4,
  },
  bio: {
    color: '#e5e5e5',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  actionButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
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
