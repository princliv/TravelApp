import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface IntroSlide {
  id: number;
  title: string;
  subtitle: string;
  illustration: string;
  color: string;
}

const introSlides: IntroSlide[] = [
  {
    id: 1,
    title: 'Plan Your Perfect Trip',
    subtitle: 'AI-powered travel planning that creates personalized itineraries just for you',
    illustration: '🤖✈️',
    color: '#4A90E2',
  },
  {
    id: 2,
    title: 'Discover Amazing Places',
    subtitle: 'Explore attractions, restaurants, and hidden gems with our smart recommendations',
    illustration: '🗺️🏛️',
    color: '#FF6B6B',
  },
  {
    id: 3,
    title: 'Optimize Your Routes',
    subtitle: 'Get the most efficient travel routes and save time on your adventures',
    illustration: '🗺️⚡',
    color: '#4ECDC4',
  },
  {
    id: 4,
    title: 'Share & Save Memories',
    subtitle: 'Save your favorite trips and share amazing experiences with friends',
    illustration: '💾📱',
    color: '#45B7D1',
  },
];

export default function IntroScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % introSlides.length;
        scrollViewRef.current?.scrollTo({
          x: nextSlide * width,
          animated: true,
        });
        return nextSlide;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('hasSeenIntro', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving intro status:', error);
      router.replace('/(tabs)');
    }
  };

  const renderSlide = (slide: IntroSlide) => (
    <View key={slide.id} style={[styles.slide, { backgroundColor: slide.color }]}>
      <View style={styles.slideContent}>
        <Text style={styles.illustration}>{slide.illustration}</Text>
        <Text style={styles.slideTitle}>{slide.title}</Text>
        <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {introSlides.map(renderSlide)}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.getStartedButton, { backgroundColor: colors.tint }]}
          onPress={handleGetStarted}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  illustration: {
    fontSize: 80,
    marginBottom: 40,
    textAlign: 'center',
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 34,
  },
  slideSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  getStartedButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
