import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { demoProfile } from '@/Data/Profile';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  // editable in local state only, the mvp goal is an editable user interface
  const [bio, setBio] = useState(demoProfile.bio);
  const [isEditingBio, setIsEditingBio] = useState(false);

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingTop: insets.top + Spacing.four,
          paddingBottom: insets.bottom + BottomTabInset + Spacing.three,
        },
      ]}>
      <ThemedView style={styles.container}>
        <Image source={{ uri: demoProfile.imageUrl }} style={styles.avatar} />
        <ThemedText type="subtitle">
          {demoProfile.name}, {demoProfile.age}
        </ThemedText>

        <View style={styles.sectionHeader}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            About me
          </ThemedText>
          <Pressable
            onPress={() => setIsEditingBio((editing) => !editing)}
            hitSlop={Spacing.two}
            style={({ pressed }) => pressed && styles.pressed}>
            <Feather name={isEditingBio ? 'check' : 'edit-2'} size={16} color={theme.accent} />
          </Pressable>
        </View>
        {isEditingBio ? (
          <TextInput
            value={bio}
            onChangeText={setBio}
            multiline
            autoFocus
            style={[styles.bioInput, { color: theme.text, backgroundColor: theme.backgroundElement }]}
          />
        ) : (
          <ThemedText>{bio}</ThemedText>
        )}

        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionHeader}>
          Interests
        </ThemedText>
        <View style={styles.chipRow}>
          {demoProfile.interests.map((interest) => (
            <ThemedView key={interest} type="backgroundElement" style={styles.chip}>
              <ThemedText type="small">{interest}</ThemedText>
            </ThemedView>
          ))}
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: Spacing.two,
  },
  sectionHeader: {
    marginTop: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
  bioInput: {
    fontSize: 16,
    lineHeight: 24,
    borderRadius: Spacing.two,
    padding: Spacing.two,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
});
