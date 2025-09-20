import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';

interface DayActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  cost: number;
  category: string;
  image?: string;
}

interface DayPlan {
  day: number;
  date: string;
  activities: DayActivity[];
  totalCost: number;
}

export default function ItineraryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Mock itinerary data - in real app this would come from API
  const [itinerary] = useState<DayPlan[]>([
    {
      day: 1,
      date: '2024-03-15',
      totalCost: 450,
      activities: [
        {
          id: '1',
          time: '09:00',
          title: 'Arrival & Hotel Check-in',
          description: 'Check into your hotel and freshen up',
          location: 'Grand Hotel Tokyo',
          duration: '2 hours',
          cost: 0,
          category: 'Accommodation',
        },
        {
          id: '2',
          time: '11:00',
          title: 'Senso-ji Temple Visit',
          description: 'Explore Tokyo\'s oldest temple and surrounding markets',
          location: 'Asakusa, Tokyo',
          duration: '3 hours',
          cost: 20,
          category: 'Culture',
        },
        {
          id: '3',
          time: '14:30',
          title: 'Traditional Lunch',
          description: 'Authentic ramen experience at local favorite',
          location: 'Ramen Street, Tokyo',
          duration: '1 hour',
          cost: 35,
          category: 'Food',
        },
        {
          id: '4',
          time: '16:00',
          title: 'Tokyo Skytree',
          description: 'Panoramic views of Tokyo from the observation deck',
          location: 'Sumida, Tokyo',
          duration: '2 hours',
          cost: 45,
          category: 'Sightseeing',
        },
      ],
    },
    {
      day: 2,
      date: '2024-03-16',
      totalCost: 380,
      activities: [
        {
          id: '5',
          time: '08:00',
          title: 'Tsukiji Fish Market',
          description: 'Early morning visit to the world\'s largest fish market',
          location: 'Tsukiji, Tokyo',
          duration: '2 hours',
          cost: 25,
          category: 'Culture',
        },
        {
          id: '6',
          time: '10:30',
          title: 'Sushi Making Class',
          description: 'Learn to make authentic sushi with a master chef',
          location: 'Ginza, Tokyo',
          duration: '3 hours',
          cost: 120,
          category: 'Experience',
        },
        {
          id: '7',
          time: '14:00',
          title: 'Shibuya Crossing',
          description: 'Experience the famous scramble crossing',
          location: 'Shibuya, Tokyo',
          duration: '1 hour',
          cost: 15,
          category: 'Sightseeing',
        },
        {
          id: '8',
          time: '15:30',
          title: 'Harajuku Shopping',
          description: 'Explore unique fashion and street culture',
          location: 'Harajuku, Tokyo',
          duration: '2 hours',
          cost: 80,
          category: 'Shopping',
        },
      ],
    },
  ]);

  const totalTripCost = itinerary.reduce((sum, day) => sum + day.totalCost, 0);

  const handleBookActivity = (activity: DayActivity) => {
    Alert.alert(
      'Book Activity',
      `Would you like to book "${activity.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book Now', 
          onPress: () => {
            Alert.alert('Booking', 'Redirecting to booking platform...');
          }
        },
      ]
    );
  };

  const handleBookAll = () => {
    Alert.alert(
      'Book Entire Trip',
      'Would you like to book all activities and accommodations for this itinerary?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book All', 
          onPress: () => {
            Alert.alert('Booking', 'Redirecting to comprehensive booking platform...');
          }
        },
      ]
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Accommodation': '🏨',
      'Culture': '🏛️',
      'Food': '🍜',
      'Sightseeing': '👁️',
      'Experience': '🎯',
      'Shopping': '🛍️',
      'Transport': '🚗',
      'Entertainment': '🎭',
    };
    return icons[category] || '📍';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.7,
      marginBottom: 12,
    },
    summaryCard: {
      backgroundColor: colors.tint + '10',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    summaryLabel: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    summaryValue: {
      fontSize: 16,
      color: colors.tint,
      fontWeight: '600',
    },
    totalCost: {
      fontSize: 20,
      color: colors.tint,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: colors.tint + '30',
    },
    bookAllButton: {
      backgroundColor: colors.tint,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 20,
    },
    bookAllButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    dayCard: {
      backgroundColor: colors.background,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dayHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    dayTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    dayCost: {
      fontSize: 16,
      color: colors.tint,
      fontWeight: '600',
    },
    activityCard: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activityHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    activityTime: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.tint,
      backgroundColor: colors.tint + '20',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    activityCost: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    activityTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    activityDescription: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.7,
      marginBottom: 8,
      lineHeight: 20,
    },
    activityMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    activityLocation: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.6,
      flex: 1,
    },
    activityDuration: {
      fontSize: 12,
      color: colors.text,
      opacity: 0.6,
    },
    activityCategory: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    categoryIcon: {
      fontSize: 16,
      marginRight: 6,
    },
    categoryText: {
      fontSize: 14,
      color: colors.tint,
      fontWeight: '500',
    },
    bookButton: {
      backgroundColor: colors.tint + '20',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    bookButtonText: {
      color: colors.tint,
      fontSize: 14,
      fontWeight: '600',
    },
    scrollContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Your Personalized Itinerary</Text>
        <Text style={styles.subtitle}>AI-generated trip plan for Tokyo, Japan</Text>
        
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration:</Text>
            <Text style={styles.summaryValue}>{itinerary.length} days</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Activities:</Text>
            <Text style={styles.summaryValue}>
              {itinerary.reduce((sum, day) => sum + day.activities.length, 0)}
            </Text>
          </View>
          <Text style={styles.totalCost}>
            Total Estimated Cost: ${totalTripCost.toLocaleString()}
          </Text>
        </View>

        <TouchableOpacity style={styles.bookAllButton} onPress={handleBookAll}>
          <Text style={styles.bookAllButtonText}>🚀 Book Entire Trip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {itinerary.map((day) => (
          <View key={day.day} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>Day {day.day}</Text>
              <Text style={styles.dayCost}>${day.totalCost}</Text>
            </View>

            {day.activities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                  <Text style={styles.activityCost}>
                    {activity.cost > 0 ? `$${activity.cost}` : 'Free'}
                  </Text>
                </View>

                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>

                <View style={styles.activityMeta}>
                  <Text style={styles.activityLocation}>📍 {activity.location}</Text>
                  <Text style={styles.activityDuration}>⏱️ {activity.duration}</Text>
                </View>

                <View style={styles.activityCategory}>
                  <Text style={styles.categoryIcon}>
                    {getCategoryIcon(activity.category)}
                  </Text>
                  <Text style={styles.categoryText}>{activity.category}</Text>
                </View>

                {activity.cost > 0 && (
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => handleBookActivity(activity)}
                  >
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ))}

        {/* Bottom padding */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
