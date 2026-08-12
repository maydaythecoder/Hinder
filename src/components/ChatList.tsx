import { Image } from 'expo-image';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Spacing } from '@/constants/theme';
import { chatListProps } from '@/Types/Chat';

export default function ChatList({ chats, onSelect }: chatListProps) {
  return (
    <FlatList
      data={chats}
      keyExtractor={(chat) => chat.id}
      ItemSeparatorComponent={() => <ThemedView type="backgroundElement" style={styles.separator} />}
      renderItem={({ item }) => {
        const lastMessage = item.messages[item.messages.length - 1];
        return (
          <Pressable
            onPress={() => onSelect(item)}
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
            <Image source={{ uri: item.profile.imageUrl }} style={styles.avatar} />
            <View style={styles.rowText}>
              <ThemedText type="smallBold">{item.profile.name}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
                {lastMessage ? lastMessage.text : 'Say hi!'}
              </ThemedText>
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              {lastMessage?.sentAt}
            </ThemedText>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  pressed: {
    opacity: 0.7,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  rowText: {
    flex: 1,
  },
  separator: {
    height: 1,
    marginLeft: Spacing.three,
  },
});
