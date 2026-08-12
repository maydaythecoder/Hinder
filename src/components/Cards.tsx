import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { Spacing } from '@/constants/theme';
import { cardProps } from '@/Types/Card';

export default function Cards({ profile }: cardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: profile.imageUrl }} style={styles.image} contentFit="cover" />
      <View style={styles.footer}>
        <ThemedText type="subtitle" style={styles.name}>
          {profile.name}, {profile.age}
        </ThemedText>
        <ThemedText type="small" style={styles.distance}>
          {profile.distanceKm} km away
        </ThemedText>
        <ThemedText type="small" style={styles.bio} numberOfLines={2}>
          {profile.bio}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: Spacing.three,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  name: {
    color: '#ffffff',
  },
  distance: {
    color: '#ffffff',
    opacity: 0.8,
  },
  bio: {
    color: '#ffffff',
    marginTop: Spacing.one,
  },
});
