import { profileData } from "@/Types/Profile";

export type swipeDirection = 'left' | 'right';

export type cardProps = {
    profile: profileData,
}

export type swipeDeckProps = {
    profiles: profileData[],
    onSwipe?: (profile: profileData, direction: swipeDirection) => void,
}
