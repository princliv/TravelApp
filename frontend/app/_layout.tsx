import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, isLoading } = useAuth();
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIntroStatus = async () => {
      try {
        const introSeen = await AsyncStorage.getItem('hasSeenIntro');
        setHasSeenIntro(introSeen === 'true');
      } catch (error) {
        console.error('Error checking intro status:', error);
        setHasSeenIntro(false);
      }
    };

    checkIntroStatus();
  }, []);

  if (isLoading || hasSeenIntro === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!hasSeenIntro ? (
          <Stack.Screen name="intro" />
        ) : isAuthenticated ? (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="itinerary" options={{ title: 'Your Itinerary' }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="login" />
            <Stack.Screen name="itinerary" options={{ title: 'Your Itinerary' }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </>
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
