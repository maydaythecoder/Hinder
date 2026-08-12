import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import Cards from './Cards';
import { ThemedText } from './themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { swipeDeckProps, swipeDirection } from '@/Types/Card';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.45; // Distance required to register a swipe

export default function SwipeDeck({ profiles, onSwipe }: swipeDeckProps) {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleSwipeComplete = (direction: swipeDirection) => {
    onSwipe?.(profiles[currentIndex], direction);
    // Reset positions instantly before updating state for the next card
    translateX.value = 0;
    translateY.value = 0;
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Flies the active card off screen, used by both the gesture and the buttons
  const swipeAway = (direction: swipeDirection, velocity: number = 0) => {
    'worklet';
    const target = direction === 'right' ? SCREEN_WIDTH + 100 : -(SCREEN_WIDTH + 100);
    translateX.value = withSpring(target, { velocity }, () => {
      runOnJS(handleSwipeComplete)(direction);
    });
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        swipeAway('right', event.velocityX);
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        swipeAway('left', event.velocityX);
      } else {
        // Snap back to absolute center
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  // Active card moves and tilts with the drag
  const activeCardStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, SCREEN_WIDTH / 2],
      [-10, 10],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
      ],
    };
  });

  const likeBadgeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  }));

  const nopeBadgeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP),
  }));

  // Next card scales smoothly into view as the top card is pulled
  const backgroundCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [0.92, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  if (currentIndex >= profiles.length) {
    return (
      <View style={styles.centerContainer}>
        <ThemedText themeColor="textSecondary">No more profiles nearby</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.deckArea}>
        {profiles
          .map((profile, index) => {
            // Do not render cards already swiped away
            if (index < currentIndex) return null;

            if (index === currentIndex) {
              return (
                <GestureDetector key={profile.id} gesture={gesture}>
                  <Animated.View style={[styles.cardSlot, styles.activeCardSlot, activeCardStyle]}>
                    <Cards profile={profile} />
                    <Animated.View style={[styles.badge, styles.likeBadge, likeBadgeStyle]}>
                      <ThemedText type="smallBold" style={styles.likeText}>
                        LIKE
                      </ThemedText>
                    </Animated.View>
                    <Animated.View style={[styles.badge, styles.nopeBadge, nopeBadgeStyle]}>
                      <ThemedText type="smallBold" style={styles.nopeText}>
                        NOPE
                      </ThemedText>
                    </Animated.View>
                  </Animated.View>
                </GestureDetector>
              );
            }

            // Only render one card deep behind the active one for performance
            if (index === currentIndex + 1) {
              return (
                <Animated.View key={profile.id} style={[styles.cardSlot, backgroundCardStyle]}>
                  <Cards profile={profile} />
                </Animated.View>
              );
            }

            return null;
          })
          .reverse()}
      </View>

      <View style={styles.actionsRow}>
        <Pressable
          onPress={() => swipeAway('left')}
          style={[styles.actionButton, { backgroundColor: theme.backgroundElement }]}>
          <Feather name="x" size={28} color="#EC5E6F" />
        </Pressable>
        <Pressable
          onPress={() => swipeAway('right')}
          style={[styles.actionButton, { backgroundColor: theme.backgroundElement }]}>
          <Feather name="heart" size={26} color={theme.accent} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSlot: {
    position: 'absolute', // Critical for correct stacking hierarchy
    width: '88%',
    maxWidth: 400,
    height: '92%',
    maxHeight: 620,
    // Universal shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  activeCardSlot: {
    zIndex: 99,
  },
  badge: {
    position: 'absolute',
    top: Spacing.four,
    borderWidth: 3,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
  },
  likeBadge: {
    left: Spacing.four,
    borderColor: '#76E2B3',
    transform: [{ rotate: '-15deg' }],
  },
  nopeBadge: {
    right: Spacing.four,
    borderColor: '#EC5E6F',
    transform: [{ rotate: '15deg' }],
  },
  likeText: {
    color: '#76E2B3',
  },
  nopeText: {
    color: '#EC5E6F',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.five,
    paddingVertical: Spacing.three,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
