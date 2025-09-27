import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

interface Location {
  id: string;
  name: string;
  type: 'attraction' | 'restaurant' | 'hotel' | 'transport';
  rating: number;
  distance: string;
  image: string;
  isSaved: boolean;
}

export default function MapScreen() {
  const { user, isAuthenticated } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // If user is not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <View style={styles.loginPrompt}>
          <Text style={styles.loginEmoji}>🗺️</Text>
          <Text style={[styles.loginTitle, { color: colors.text }]}>Login Required</Text>
          <Text style={[styles.loginSubtitle, { color: colors.text, opacity: 0.7 }]}>
            Please log in to access map features and discover places
          </Text>
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.tint }]}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginButtonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Mock locations data
  const [locations] = useState<Location[]>([
    {
      id: '1',
      name: 'Tokyo Skytree',
      type: 'attraction',
      rating: 4.5,
      distance: '2.3 km',
      image: '🗼',
      isSaved: true,
    },
    {
      id: '2',
      name: 'Sushi Dai',
      type: 'restaurant',
      rating: 4.8,
      distance: '1.1 km',
      image: '🍣',
      isSaved: false,
    },
    {
      id: '3',
      name: 'Park Hyatt Tokyo',
      type: 'hotel',
      rating: 4.7,
      distance: '3.2 km',
      image: '🏨',
      isSaved: true,
    },
    {
      id: '4',
      name: 'Tokyo Station',
      type: 'transport',
      rating: 4.2,
      distance: '0.8 km',
      image: '🚉',
      isSaved: false,
    },
  ]);

  const handleLocationPress = (location: Location) => {
    Alert.alert(
      location.name,
      `${location.type.charAt(0).toUpperCase() + location.type.slice(1)} • ${location.rating}⭐ • ${location.distance} away`,
      [
        { text: 'View Details', onPress: () => Alert.alert('Details', 'Location details coming soon!') },
        { text: 'Directions', onPress: () => Alert.alert('Directions', 'Navigation coming soon!') },
        { text: 'OK' },
      ]
    );
  };

  const handleSaveLocation = (locationId: string) => {
    Alert.alert('Saved!', 'Location added to your saved places');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'attraction': return '#4CAF50';
      case 'restaurant': return '#FF9800';
      case 'hotel': return '#2196F3';
      case 'transport': return '#9C27B0';
      default: return colors.border;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'attraction': return '🎯';
      case 'restaurant': return '🍽️';
      case 'hotel': return '🏨';
      case 'transport': return '🚌';
      default: return '📍';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Map & Places</Text>
        <Text style={[styles.subtitle, { color: colors.text, opacity: 0.7 }]}>
          Discover amazing places around you
        </Text>
      </View>

      {/* Map Placeholder */}
      <View style={[styles.mapContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
        <Text style={styles.mapPlaceholder}>🗺️</Text>
        <Text style={[styles.mapText, { color: colors.text }]}>Interactive Map</Text>
        <Text style={[styles.mapSubtext, { color: colors.text, opacity: 0.7 }]}>
          Map integration coming soon
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.tint }]}>
          <Text style={styles.actionButtonText}>📍 My Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.background, borderColor: colors.border }]}>
          <Text style={[styles.actionButtonText, { color: colors.text }]}>🔍 Search</Text>
        </TouchableOpacity>
      </View>

      {/* Nearby Locations */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Nearby Places</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.locationsScroll}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[styles.locationCard, { backgroundColor: colors.background, borderColor: colors.border }]}
              onPress={() => handleLocationPress(location)}
            >
              <View style={styles.locationHeader}>
                <Text style={styles.locationEmoji}>{location.image}</Text>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => handleSaveLocation(location.id)}
                >
                  <Text style={styles.saveIcon}>{location.isSaved ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={[styles.locationName, { color: colors.text }]}>{location.name}</Text>
              
              <View style={styles.locationDetails}>
                <View style={styles.locationType}>
                  <Text style={styles.typeIcon}>{getTypeIcon(location.type)}</Text>
                  <Text style={[styles.typeText, { color: colors.text, opacity: 0.7 }]}>
                    {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                  </Text>
                </View>
                <View style={styles.locationRating}>
                  <Text style={styles.ratingText}>⭐ {location.rating}</Text>
                  <Text style={[styles.distanceText, { color: colors.text, opacity: 0.7 }]}>
                    {location.distance}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Explore by Category</Text>
        <View style={styles.categoriesGrid}>
          {[
            { name: 'Attractions', icon: '🎯', color: '#4CAF50' },
            { name: 'Restaurants', icon: '🍽️', color: '#FF9800' },
            { name: 'Hotels', icon: '🏨', color: '#2196F3' },
            { name: 'Transport', icon: '🚌', color: '#9C27B0' },
          ].map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: colors.border }]}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[styles.categoryName, { color: colors.text }]}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  mapContainer: {
    height: 200,
    margin: 20,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  mapSubtext: {
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  locationsScroll: {
    paddingLeft: 20,
  },
  locationCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationEmoji: {
    fontSize: 24,
  },
  saveButton: {
    padding: 4,
  },
  saveIcon: {
    fontSize: 16,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationDetails: {
    gap: 8,
  },
  locationType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  typeText: {
    fontSize: 12,
  },
  locationRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  distanceText: {
    fontSize: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    width: '47%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Login prompt styles
  loginPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loginEmoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  loginButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
