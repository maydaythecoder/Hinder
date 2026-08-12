import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ChatList from '@/components/ChatList';
import ChatThread from '@/components/ChatThread';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { chatSeed } from '@/Data/Chats';
import { messageData } from '@/Types/Chat';

export default function ChatsScreen() {
  const insets = useSafeAreaInsets();
  // chats live in local state until there is a backend to sync with
  const [chats, setChats] = useState(chatSeed);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const handleSend = (text: string) => {
    if (!activeChat) return;
    const message: messageData = {
      id: `${activeChat.id}-${Date.now()}`,
      senderId: 'me',
      text,
      sentAt: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    };
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChat.id ? { ...chat, messages: [...chat.messages, message] } : chat
      )
    );
  };

  return (
    <ThemedView
      style={[
        styles.screen,
        {
          paddingTop: insets.top + Spacing.three,
          paddingBottom: insets.bottom + BottomTabInset + Spacing.three,
        },
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.content}>
        {activeChat ? (
          <ChatThread
            chat={activeChat}
            onBack={() => setActiveChatId(null)}
            onSend={handleSend}
          />
        ) : (
          <>
            <ThemedText type="subtitle" style={styles.heading}>
              Chats
            </ThemedText>
            <ChatList chats={chats} onSelect={(chat) => setActiveChatId(chat.id)} />
          </>
        )}
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
  },
  heading: {
    paddingHorizontal: Spacing.three,
    marginBottom: Spacing.two,
  },
});
