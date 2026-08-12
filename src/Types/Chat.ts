import { profileData } from "@/Types/Profile";

export type messageData = {
    id: string,
    // 'me' for the logged in user, otherwise the matched profile's id
    senderId: string,
    text: string,
    sentAt: string,
}

export type chatData = {
    id: string,
    profile: profileData,
    messages: messageData[],
}

export type chatListProps = {
    chats: chatData[],
    onSelect: (chat: chatData) => void,
}

export type chatThreadProps = {
    chat: chatData,
    onBack: () => void,
    onSend: (text: string) => void,
}
