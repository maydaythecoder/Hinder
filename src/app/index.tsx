import * as Device from 'expo-device';
import { Platform, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen({ title, description, imageUrl }: { title: string; description: string; imageUrl?: string }) {
  return (
    <ThemedView style={styles.container}>
      /*
      by default you land on the home page
      this will contain a modular component that will be used to navigate to other pages
      it will take a list of said pages
      apon the selection of a bottom navbar it will navigate to the selected page
      */
      <TouchableOpacity style={styles.Card}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
        <ThemedText style={styles.title}>{title}</ThemedText>
        <ThemedText style={styles.description}>{description}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  Card: {
    width: 200,
    height: 200,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
});
