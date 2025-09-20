import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, Alert, ScrollView, View, Text, Dimensions } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface TripHistory {
  id: string;
  destination: string;
  date: string;
  duration: string;
  cost: number;
  status: 'completed' | 'upcoming' | 'draft';
  image: string;
}

interface UserStats {
  totalTrips: number;
  countriesVisited: number;
  totalSpent: number;
  favoriteDestination: string;
}

export default function HomeScreen() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Mock user stats
  const userStats: UserStats = {
    totalTrips: 12,
    countriesVisited: 8,
    totalSpent: 15420,
    favoriteDestination: 'Japan',
  };

  // Mock trip history
  const tripHistory: TripHistory[] = [
    {
      id: '1',
      destination: 'Tokyo, Japan',
      date: '2024-02-15',
      duration: '7 days',
      cost: 3200,
      status: 'completed',
      image: '🏯',
    },
    {
      id: '2',
      destination: 'Paris, France',
      date: '2024-03-20',
      duration: '5 days',
      cost: 2800,
      status: 'upcoming',
      image: '🗼',
    },
    {
      id: '3',
      destination: 'Bali, Indonesia',
      date: '2024-01-10',
      duration: '10 days',
      cost: 1800,
      status: 'completed',
      image: '🏝️',
    },
  ];


  const handleStartPlanning = () => {
    router.push('/(tabs)/planner');
  };

  const handleViewTrip = (trip: TripHistory) => {
    Alert.alert(
      trip.destination,
      `${trip.duration} trip - ${trip.status === 'completed' ? 'Completed' : 'Upcoming'}\nCost: $${trip.cost.toLocaleString()}`,
      [
        { text: 'View Details', onPress: () => router.push('/itinerary') },
        { text: 'OK' },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleViewAllTrips = () => {
    Alert.alert('All Trips', 'Trip history feature coming soon!');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4A90E2', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerImage}>
          <Text style={styles.headerEmoji}>🌍✈️🏖️</Text>
        </View>
      }>
      
      {/* Profile Section */}
      <ThemedView style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileAvatar}>👤</Text>
            <View style={styles.profileDetails}>
              <ThemedText style={styles.profileName}>{user?.name || 'Traveler'}</ThemedText>
              <ThemedText style={styles.profileEmail}>{user?.email}</ThemedText>
            </View>
          </View>
          <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
            <Text style={styles.editProfileIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* User Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.totalTrips}</Text>
            <ThemedText style={styles.statLabel}>Trips</ThemedText>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.countriesVisited}</Text>
            <ThemedText style={styles.statLabel}>Countries</ThemedText>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>${(userStats.totalSpent / 1000).toFixed(0)}k</Text>
            <ThemedText style={styles.statLabel}>Spent</ThemedText>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>⭐</Text>
            <ThemedText style={styles.statLabel}>{userStats.favoriteDestination}</ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.quickActionsContainer}>
        <TouchableOpacity style={styles.primaryAction} onPress={handleStartPlanning}>
          <Text style={styles.primaryActionIcon}>🤖</Text>
          <ThemedText style={styles.primaryActionText}>Start AI Trip Planning</ThemedText>
          <ThemedText style={styles.primaryActionSubtext}>Create your perfect itinerary</ThemedText>
        </TouchableOpacity>

        <View style={styles.secondaryActions}>
          <TouchableOpacity style={styles.secondaryAction}>
            <Text style={styles.secondaryActionIcon}>⭐</Text>
            <ThemedText style={styles.secondaryActionText}>Saved Places</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryAction}>
            <Text style={styles.secondaryActionIcon}>🏆</Text>
            <ThemedText style={styles.secondaryActionText}>Achievements</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Recent Trips */}
      <ThemedView style={styles.tripsContainer}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">📋 Recent Trips</ThemedText>
          <TouchableOpacity onPress={handleViewAllTrips}>
            <ThemedText style={styles.viewAllText}>View All</ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tripsScrollView}>
          {tripHistory.map((trip, index) => (
            <TouchableOpacity
              key={trip.id}
              style={[styles.tripCard, { marginLeft: index === 0 ? 0 : 12 }]}
              onPress={() => handleViewTrip(trip)}
            >
              <Text style={styles.tripEmoji}>{trip.image}</Text>
              <ThemedText style={styles.tripDestination}>{trip.destination}</ThemedText>
              <ThemedText style={styles.tripDate}>{trip.date}</ThemedText>
              <View style={styles.tripDetails}>
                <ThemedText style={styles.tripDuration}>{trip.duration}</ThemedText>
                <ThemedText style={styles.tripCost}>${trip.cost.toLocaleString()}</ThemedText>
              </View>
              <View style={[
                styles.tripStatus,
                { backgroundColor: trip.status === 'completed' ? '#4CAF50' : trip.status === 'upcoming' ? '#FF9800' : '#9E9E9E' }
              ]}>
                <Text style={styles.tripStatusText}>
                  {trip.status === 'completed' ? '✓' : trip.status === 'upcoming' ? '⏰' : '📝'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Travel Insights */}
      <ThemedView style={styles.insightsContainer}>
        <ThemedText type="subtitle">💡 Your Travel Insights</ThemedText>
        <View style={styles.insightCard}>
          <Text style={styles.insightIcon}>🎯</Text>
          <View style={styles.insightContent}>
            <ThemedText style={styles.insightTitle}>Most Visited: {userStats.favoriteDestination}</ThemedText>
            <ThemedText style={styles.insightDescription}>
              You've explored {userStats.favoriteDestination} the most. Ready for your next adventure?
            </ThemedText>
          </View>
        </View>
        <View style={styles.insightCard}>
          <Text style={styles.insightIcon}>💰</Text>
          <View style={styles.insightContent}>
            <ThemedText style={styles.insightTitle}>Average Trip Cost</ThemedText>
            <ThemedText style={styles.insightDescription}>
              ${(userStats.totalSpent / userStats.totalTrips).toFixed(0)} per trip - Great budgeting!
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Quick Stats Summary */}
      <ThemedView style={styles.quickStatsContainer}>
        <ThemedText style={styles.quickStatsText}>
          You've completed {userStats.totalTrips} trips across {userStats.countriesVisited} countries! 
          Keep exploring the world! 🌍
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 48,
    opacity: 0.8,
  },
  // Profile Section
  profileSection: {
    marginBottom: 24,
    backgroundColor: 'rgba(74, 144, 226, 0.05)',
    borderRadius: 16,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileAvatar: {
    fontSize: 40,
    marginRight: 12,
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    width: 50,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  editProfileButton: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 20,
    padding: 8,
  },
  editProfileIcon: {
    fontSize: 16,
  },
  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  // Quick Actions
  quickActionsContainer: {
    marginBottom: 24,
  },
  primaryAction: {
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryActionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  primaryActionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  primaryActionSubtext: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.2)',
  },
  secondaryActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  // Recent Trips
  tripsContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  tripsScrollView: {
    flexGrow: 0,
  },
  tripCard: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  tripEmoji: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  tripDate: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 8,
    textAlign: 'center',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tripDuration: {
    fontSize: 12,
    color: '#4A90E2',
  },
  tripCost: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A90E2',
  },
  tripStatus: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripStatusText: {
    fontSize: 12,
    color: 'white',
  },
  // Insights
  insightsContainer: {
    marginBottom: 24,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(74, 144, 226, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  insightIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#4A90E2',
  },
  insightDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  // Quick Stats
  quickStatsContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(74, 144, 226, 0.05)',
    alignItems: 'center',
  },
  quickStatsText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
});
