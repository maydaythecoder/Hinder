import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { cardProps } from '@/Types/Card';

export default function Cards({ title, description, imageUrl }: cardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.description}>{description}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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

