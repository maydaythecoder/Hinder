import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { chatThreadProps } from '@/Types/Chat';

export default function ChatThread({ chat, onBack, onSend }: chatThreadProps) {
  const theme = useTheme();
  const [draft, setDraft] = useState('');

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    onSend(text);
    setDraft('');
  };

  return (
    <View style={styles.container}>
      <ThemedView type="backgroundElement" style={styles.header}>
        <Pressable onPress={onBack} hitSlop={Spacing.two} style={({ pressed }) => pressed && styles.pressed}>
          <Feather name="chevron-left" size={24} color={theme.text} />
        </Pressable>
        <Image source={{ uri: chat.profile.imageUrl }} style={styles.avatar} />
        <ThemedText type="smallBold">{chat.profile.name}</ThemedText>
      </ThemedView>

      <FlatList
        data={chat.messages}
        keyExtractor={(message) => message.id}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => {
          const isMine = item.senderId === 'me';
          return (
            <View
              style={[
                styles.bubble,
                isMine
                  ? [styles.bubbleMine, { backgroundColor: theme.accent }]
                  : { backgroundColor: theme.backgroundElement },
              ]}>
              <ThemedText type="small" style={isMine && styles.bubbleMineText}>
                {item.text}
              </ThemedText>
              <ThemedText
                type="small"
                themeColor="textSecondary"
                style={[styles.sentAt, isMine && styles.bubbleMineText]}>
                {item.sentAt}
              </ThemedText>
            </View>
          );
        }}
      />

      <ThemedView type="backgroundElement" style={styles.inputRow}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={handleSend}
          submitBehavior="submit"
          placeholder="Type a message"
          placeholderTextColor={theme.textSecondary}
          style={[styles.input, { color: theme.text }]}
        />
        <Pressable
          onPress={handleSend}
          style={({ pressed }) => [
            styles.sendButton,
            { backgroundColor: theme.accent },
            pressed && styles.pressed,
          ]}>
          <Feather name="send" size={18} color="#ffffff" />
        </Pressable>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.two,
    borderRadius: Spacing.three,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  pressed: {
    opacity: 0.7,
  },
  messageList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
  },
  bubble: {
    maxWidth: '78%',
    alignSelf: 'flex-start',
    borderRadius: Spacing.three,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  bubbleMine: {
    alignSelf: 'flex-end',
  },
  bubbleMineText: {
    color: '#ffffff',
  },
  sentAt: {
    fontSize: 10,
    lineHeight: 14,
    alignSelf: 'flex-end',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.two,
    borderRadius: Spacing.four,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
