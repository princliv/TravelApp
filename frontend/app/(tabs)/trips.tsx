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

interface SavedTrip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: 'draft' | 'planned' | 'completed';
  image: string;
  budget: number;
  travelers: number;
}

export default function TripsScreen() {
  const { user, isAuthenticated } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // If user is not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <View style={styles.loginPrompt}>
          <Text style={styles.loginEmoji}>🔒</Text>
          <Text style={[styles.loginTitle, { color: colors.text }]}>Login Required</Text>
          <Text style={[styles.loginSubtitle, { color: colors.text, opacity: 0.7 }]}>
            Please log in to view your saved trips
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

  // Mock saved trips data
  const [savedTrips] = useState<SavedTrip[]>([
    {
      id: '1',
      destination: 'Tokyo, Japan',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      duration: '7 days',
      status: 'planned',
      image: '🏯',
      budget: 3200,
      travelers: 2,
    },
    {
      id: '2',
      destination: 'Paris, France',
      startDate: '2024-04-10',
      endDate: '2024-04-15',
      duration: '5 days',
      status: 'draft',
      image: '🗼',
      budget: 1800,
      travelers: 1,
    },
    {
      id: '3',
      destination: 'Bali, Indonesia',
      startDate: '2024-01-20',
      endDate: '2024-01-30',
      duration: '10 days',
      status: 'completed',
      image: '🏝️',
      budget: 1200,
      travelers: 2,
    },
  ]);

  const handleCreateNewTrip = () => {
    router.push('/(tabs)/planner');
  };

  const handleViewTrip = (trip: SavedTrip) => {
    Alert.alert(
      trip.destination,
      `${trip.duration} trip - ${trip.status === 'completed' ? 'Completed' : trip.status === 'planned' ? 'Planned' : 'Draft'}\nBudget: $${trip.budget.toLocaleString()}\nTravelers: ${trip.travelers}`,
      [
        { text: 'View Details', onPress: () => router.push('/itinerary') },
        { text: 'Edit', onPress: () => Alert.alert('Edit', 'Edit feature coming soon!') },
        { text: 'OK' },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'planned': return '#2196F3';
      case 'draft': return '#FF9800';
      default: return colors.border;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'planned': return 'Planned';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Trips</Text>
        <Text style={[styles.subtitle, { color: colors.text, opacity: 0.7 }]}>
          {savedTrips.length} saved trips
        </Text>
      </View>

      {/* Create New Trip Button */}
      <TouchableOpacity
        style={[styles.createButton, { backgroundColor: colors.tint }]}
        onPress={handleCreateNewTrip}
      >
        <Text style={styles.createButtonText}>+ Plan New Trip</Text>
      </TouchableOpacity>

      {/* Trips List */}
      <ScrollView style={styles.tripsList} showsVerticalScrollIndicator={false}>
        {savedTrips.map((trip) => (
          <TouchableOpacity
            key={trip.id}
            style={[styles.tripCard, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={() => handleViewTrip(trip)}
          >
            <View style={styles.tripHeader}>
              <Text style={styles.tripEmoji}>{trip.image}</Text>
              <View style={styles.tripInfo}>
                <Text style={[styles.tripDestination, { color: colors.text }]}>
                  {trip.destination}
                </Text>
                <Text style={[styles.tripDates, { color: colors.text, opacity: 0.7 }]}>
                  {trip.startDate} - {trip.endDate}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trip.status) }]}>
                <Text style={styles.statusText}>
                  {getStatusText(trip.status)}
                </Text>
              </View>
            </View>
            
            <View style={styles.tripDetails}>
              <View style={styles.tripDetailItem}>
                <Text style={[styles.detailLabel, { color: colors.text, opacity: 0.7 }]}>Duration</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{trip.duration}</Text>
              </View>
              <View style={styles.tripDetailItem}>
                <Text style={[styles.detailLabel, { color: colors.text, opacity: 0.7 }]}>Budget</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>${trip.budget.toLocaleString()}</Text>
              </View>
              <View style={styles.tripDetailItem}>
                <Text style={[styles.detailLabel, { color: colors.text, opacity: 0.7 }]}>Travelers</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{trip.travelers}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        {savedTrips.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>✈️</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No trips yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.text, opacity: 0.7 }]}>
              Start planning your first adventure!
            </Text>
          </View>
        )}
      </ScrollView>
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
  createButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  tripsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tripCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tripEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  tripInfo: {
    flex: 1,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripDetailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
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
