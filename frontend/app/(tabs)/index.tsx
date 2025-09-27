import { StyleSheet, TouchableOpacity, Alert, View, Text, Modal, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface SavedTrip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: 'draft' | 'planned' | 'completed';
  image: string;
  budget: number;
}

export default function HomeScreen() {
  const { user, isAuthenticated } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Mock data for authenticated users
  const [recentTrips] = useState<SavedTrip[]>([
    {
      id: '1',
      destination: 'Tokyo, Japan',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      duration: '7 days',
      status: 'planned',
      image: '🏯',
      budget: 3200,
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
    },
  ]);

  const handlePlanNewTrip = () => {
    if (isAuthenticated) {
      // For now, show an alert since we don't have a dedicated planner page
      Alert.alert('Plan New Trip', 'Trip planning feature coming soon!');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleViewTrip = (trip: SavedTrip) => {
    Alert.alert(
      trip.destination,
      `${trip.duration} trip - ${trip.status === 'completed' ? 'Completed' : trip.status === 'planned' ? 'Planned' : 'Draft'}\nBudget: $${trip.budget.toLocaleString()}`,
      [
        { text: 'View Details', onPress: () => router.push('/itinerary') },
        { text: 'Edit', onPress: () => Alert.alert('Edit', 'Edit feature coming soon!') },
        { text: 'OK' },
      ]
    );
  };

  const handleLoginPress = () => {
    setShowLoginModal(false);
    router.push('/login');
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Welcome, {isAuthenticated ? user?.name || 'Traveler' : 'Guest'} 👋
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text, opacity: 0.7 }]}>
          {isAuthenticated ? 'Ready for your next adventure?' : 'Explore our features and create an account to save your trips'}
        </Text>
      </View>

      {isAuthenticated ? (
        // Authenticated User Dashboard
        <>
          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={[styles.primaryAction, { backgroundColor: colors.tint }]} 
              onPress={handlePlanNewTrip}
            >
              <Text style={styles.primaryActionIcon}>🤖</Text>
              <Text style={styles.primaryActionText}>Plan New Trip</Text>
              <Text style={styles.primaryActionSubtext}>AI-powered trip planning</Text>
            </TouchableOpacity>

            <View style={styles.secondaryActions}>
              <TouchableOpacity style={[styles.secondaryAction, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Text style={styles.secondaryActionIcon}>🗺️</Text>
                <Text style={[styles.secondaryActionText, { color: colors.text }]}>Explore</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.secondaryAction, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Text style={styles.secondaryActionIcon}>⚡</Text>
                <Text style={[styles.secondaryActionText, { color: colors.text }]}>Optimize</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Trips */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Trips</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/trips')}>
                <Text style={[styles.viewAllText, { color: colors.tint }]}>View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tripsScrollView}>
              {recentTrips.map((trip, index) => (
                <TouchableOpacity
                  key={trip.id}
                  style={[styles.tripCard, { backgroundColor: colors.background, borderColor: colors.border, marginLeft: index === 0 ? 0 : 12 }]}
                  onPress={() => handleViewTrip(trip)}
                >
                  <Text style={styles.tripEmoji}>{trip.image}</Text>
                  <Text style={[styles.tripDestination, { color: colors.text }]}>{trip.destination}</Text>
                  <Text style={[styles.tripDate, { color: colors.text, opacity: 0.7 }]}>{trip.startDate}</Text>
                  <View style={styles.tripDetails}>
                    <Text style={[styles.tripDuration, { color: colors.tint }]}>{trip.duration}</Text>
                    <Text style={[styles.tripCost, { color: colors.tint }]}>${trip.budget.toLocaleString()}</Text>
                  </View>
                  <View style={[
                    styles.tripStatus,
                    { backgroundColor: trip.status === 'completed' ? '#4CAF50' : trip.status === 'planned' ? '#2196F3' : '#FF9800' }
                  ]}>
                    <Text style={styles.tripStatusText}>
                      {trip.status === 'completed' ? '✓' : trip.status === 'planned' ? '⏰' : '📝'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Quick Access */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Access</Text>
            <View style={styles.quickAccessGrid}>
              <TouchableOpacity style={[styles.quickAccessItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Text style={styles.quickAccessIcon}>⚙️</Text>
                <Text style={[styles.quickAccessText, { color: colors.text }]}>Preferences</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.quickAccessItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Text style={styles.quickAccessIcon}>🏨</Text>
                <Text style={[styles.quickAccessText, { color: colors.text }]}>Hotels</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.quickAccessItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Text style={styles.quickAccessIcon}>📋</Text>
                <Text style={[styles.quickAccessText, { color: colors.text }]}>Itineraries</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        // Guest Mode
        <>
          {/* Main Features */}
          <View style={styles.featuresContainer}>
            <TouchableOpacity style={[styles.featureCard, { backgroundColor: colors.background, borderColor: colors.border }]} onPress={handlePlanNewTrip}>
              <Text style={styles.featureIcon}>🤖</Text>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Plan New Trip</Text>
              <Text style={[styles.featureDescription, { color: colors.text, opacity: 0.7 }]}>
                AI-powered trip planning with personalized itineraries
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.featureCard, { backgroundColor: colors.background, borderColor: colors.border }]} onPress={() => setShowLoginModal(true)}>
              <Text style={styles.featureIcon}>🗺️</Text>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Explore Attractions</Text>
              <Text style={[styles.featureDescription, { color: colors.text, opacity: 0.7 }]}>
                Discover amazing places, restaurants, and hidden gems
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.featureCard, { backgroundColor: colors.background, borderColor: colors.border }]} onPress={() => setShowLoginModal(true)}>
              <Text style={styles.featureIcon}>⚡</Text>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Optimize Routes</Text>
              <Text style={[styles.featureDescription, { color: colors.text, opacity: 0.7 }]}>
                Get the most efficient travel routes and save time
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Login Modal */}
      <Modal
        visible={showLoginModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Create a free account to continue 🚀
            </Text>
            <Text style={[styles.modalSubtitle, { color: colors.text, opacity: 0.7 }]}>
              Save trips, sync across devices, and unlock full AI features.
            </Text>
            
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.tint }]}
              onPress={handleLoginPress}
            >
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleCloseModal}
            >
              <Text style={[styles.modalCloseText, { color: colors.text, opacity: 0.5 }]}>
                Maybe later
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  // Quick Actions for Authenticated Users
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  primaryAction: {
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
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Sections
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Trips
  tripsScrollView: {
    paddingLeft: 20,
  },
  tripCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
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
  },
  tripCost: {
    fontSize: 12,
    fontWeight: '600',
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
  // Quick Access
  quickAccessGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  quickAccessItem: {
    flex: 1,
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
  quickAccessIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Guest Mode Features
  featuresContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  featureCard: {
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  modalButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  modalCloseButton: {
    paddingVertical: 8,
  },
  modalCloseText: {
    fontSize: 16,
  },
});
