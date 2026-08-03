/*
REFERENCE TEMPLATE
*/

import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  runOnJS, 
  interpolate, 
  Extrapolation 
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.45; // Distance required to register a swipe

export default function SwipeDeck() {
  // 1. Core Data State
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    { id: 1, text: 'Card One', color: '#E91E63' },
    { id: 2, text: 'Card Two', color: '#9C27B0' },
    { id: 3, text: 'Card Three', color: '#2196F3' },
    { id: 4, text: 'Card Four', color: '#4CAF50' },
  ];

  // 2. Shared Values for Native Thread Animation
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // 3. Callback triggered safely via JavaScript context
  const handleSwipeComplete = (direction) => {
    console.log(`Swiped: ${direction} on index: ${currentIndex}`);
    // Reset positions instantly before updating state for the next card
    translateX.value = 0;
    translateY.value = 0;
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // 4. Gesture Configurator
  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        // Fly Right off screen
        translateX.value = withSpring(SCREEN_WIDTH + 100, { velocity: event.velocityX }, () => {
          runOnJS(handleSwipeComplete)('RIGHT');
        });
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        // Fly Left off screen
        translateX.value = withSpring(-SCREEN_WIDTH - 100, { velocity: event.velocityX }, () => {
          runOnJS(handleSwipeComplete)('LEFT');
        });
      } else {
        // Snap back to absolute center
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  // 5. Active Card Custom Styles (Moves & Tilts)
  const activeCardStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, SCREEN_WIDTH / 2],
      [-10, 10], // Maximum 10-degree tilt
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

  // 6. Next Card Styles (Scales smoothly into view as you pull top card)
  const backgroundCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [0.92, 1], // Transition from slightly smaller up to full scale
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale: scale }],
    };
  });

  // Out of cards check
  if (currentIndex >= cards.length) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No More Cards!</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.deckArea}>
        {cards
          .map((card, index) => {
            // Do not render cards already swiped away
            if (index < currentIndex) return null;

            // Top Interactive Active Card
            if (index === currentIndex) {
              return (
                <GestureDetector key={card.id} gesture={gesture}>
                  <Animated.View style={[styles.card, activeCardStyle, { backgroundColor: card.color, zIndex: 99 }]}>
                    <Text style={styles.cardText}>{card.text}</Text>
                  </Animated.View>
                </GestureDetector>
              );
            }

            // Immediately Next Background Card (only render one deep for performance optimization)
            if (index === currentIndex + 1) {
              return (
                <Animated.View key={card.id} style={[styles.card, backgroundCardStyle, { backgroundColor: card.color, zIndex: 1 }]}>
                  <Text style={styles.cardText}>{card.text}</Text>
                </Animated.View>
              );
            }

            return null;
          })
          .reverse()} 
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  card: {
    position: 'absolute', // Critical for correct stacking hierarchy
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.65,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    // Universal Shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  cardText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#aaa',
  },
});
