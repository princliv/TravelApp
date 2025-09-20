import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';

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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Mock user stats
  const userStats = {
    totalTrips: 12,
    countriesVisited: 8,
    totalSpent: 15420,
    favoriteDestination: 'Japan',
    memberSince: '2023-01-15',
    level: 'Explorer',
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
    {
      id: '4',
      destination: 'New York, USA',
      date: '2023-12-05',
      duration: '6 days',
      cost: 2500,
      status: 'completed',
      image: '🗽',
    },
    {
      id: '5',
      destination: 'London, UK',
      date: '2023-11-15',
      duration: '4 days',
      cost: 2200,
      status: 'completed',
      image: '🏰',
    },
  ];

  // Mock achievements
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Trip',
      description: 'Completed your first trip',
      icon: '🎯',
      unlocked: true,
    },
    {
      id: '2',
      title: 'Globe Trotter',
      description: 'Visited 5 different countries',
      icon: '🌍',
      unlocked: true,
    },
    {
      id: '3',
      title: 'Budget Master',
      description: 'Saved over $1000 on trips',
      icon: '💰',
      unlocked: true,
    },
    {
      id: '4',
      title: 'Adventure Seeker',
      description: 'Completed 10 trips',
      icon: '🏔️',
      unlocked: true,
    },
    {
      id: '5',
      title: 'World Explorer',
      description: 'Visit 15 countries',
      icon: '🌎',
      unlocked: false,
      progress: 8,
    },
    {
      id: '6',
      title: 'VIP Traveler',
      description: 'Spend $20,000 on trips',
      icon: '👑',
      unlocked: false,
      progress: 77,
    },
  ];

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleViewTrip = (trip: TripHistory) => {
    Alert.alert(
      trip.destination,
      `${trip.duration} trip - ${trip.status === 'completed' ? 'Completed' : 'Upcoming'}\nCost: $${trip.cost.toLocaleString()}`,
      [
        { text: 'View Details', onPress: () => console.log('View trip details') },
        { text: 'OK' },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const handleViewAllTrips = () => {
    Alert.alert('All Trips', 'Complete trip history feature coming soon!');
  };

  const handleShareProfile = () => {
    Alert.alert('Share Profile', 'Share your travel achievements with friends!');
  };

  const getUnlockedAchievements = () => achievements.filter(a => a.unlocked);
  const getLockedAchievements = () => achievements.filter(a => !a.unlocked);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flex: 1,
    },
    // Header Section
    headerSection: {
      backgroundColor: '#4A90E2',
      paddingTop: 20,
      paddingBottom: 30,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    profileAvatar: {
      fontSize: 60,
      backgroundColor: 'white',
      borderRadius: 50,
      width: 100,
      height: 100,
      textAlign: 'center',
      lineHeight: 100,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    profileName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: 16,
      color: 'white',
      opacity: 0.9,
      marginBottom: 8,
    },
    userLevel: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 20,
      marginBottom: 16,
    },
    levelText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    memberSince: {
      color: 'white',
      fontSize: 12,
      opacity: 0.8,
    },
    // Stats Section
    statsSection: {
      backgroundColor: colors.background,
      marginTop: -20,
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      marginBottom: 20,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    statCard: {
      width: (width - 80) / 2,
      backgroundColor: 'rgba(74, 144, 226, 0.05)',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#4A90E2',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      color: colors.text,
      textAlign: 'center',
      opacity: 0.7,
    },
    // Action Buttons
    actionButtons: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 20,
      gap: 12,
    },
    actionButton: {
      flex: 1,
      backgroundColor: '#4A90E2',
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    actionButtonSecondary: {
      backgroundColor: 'rgba(74, 144, 226, 0.1)',
      borderWidth: 1,
      borderColor: '#4A90E2',
    },
    actionButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    actionButtonTextSecondary: {
      color: '#4A90E2',
    },
    // Sections
    section: {
      marginBottom: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    viewAllText: {
      fontSize: 14,
      color: '#4A90E2',
      fontWeight: '600',
    },
    // Recent Trips
    tripsScrollView: {
      paddingLeft: 20,
    },
    tripCard: {
      width: 140,
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 12,
      marginRight: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tripEmoji: {
      fontSize: 24,
      marginBottom: 8,
      textAlign: 'center',
    },
    tripDestination: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 4,
      textAlign: 'center',
      color: colors.text,
    },
    tripDate: {
      fontSize: 10,
      opacity: 0.6,
      marginBottom: 6,
      textAlign: 'center',
      color: colors.text,
    },
    tripCost: {
      fontSize: 12,
      fontWeight: '600',
      color: '#4A90E2',
      textAlign: 'center',
    },
    // Achievements
    achievementsContainer: {
      paddingHorizontal: 20,
    },
    achievementCard: {
      flexDirection: 'row',
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    achievementCardLocked: {
      opacity: 0.5,
    },
    achievementIcon: {
      fontSize: 32,
      marginRight: 16,
    },
    achievementContent: {
      flex: 1,
    },
    achievementTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
      color: colors.text,
    },
    achievementDescription: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.7,
    },
    achievementProgress: {
      fontSize: 12,
      color: '#4A90E2',
      fontWeight: '600',
      marginTop: 4,
    },
    // Logout Section
    logoutSection: {
      paddingHorizontal: 20,
      marginBottom: 40,
    },
    logoutButton: {
      backgroundColor: '#ff4444',
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    logoutButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.profileAvatar}>👤</Text>
          <Text style={styles.profileName}>{user?.name || 'Traveler'}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          <View style={styles.userLevel}>
            <Text style={styles.levelText}>🌟 {userStats.level}</Text>
          </View>
          <Text style={styles.memberSince}>Member since {userStats.memberSince}</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.totalTrips}</Text>
              <Text style={styles.statLabel}>Total Trips</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.countriesVisited}</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>${(userStats.totalSpent / 1000).toFixed(0)}k</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>⭐</Text>
              <Text style={styles.statLabel}>{userStats.favoriteDestination}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
            <Text style={styles.actionButtonText}>✏️ Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]} onPress={handleShareProfile}>
            <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>📤 Share</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📋 Recent Trips</Text>
            <TouchableOpacity onPress={handleViewAllTrips}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tripsScrollView}>
            {tripHistory.map((trip, index) => (
              <TouchableOpacity
                key={trip.id}
                style={styles.tripCard}
                onPress={() => handleViewTrip(trip)}
              >
                <Text style={styles.tripEmoji}>{trip.image}</Text>
                <Text style={styles.tripDestination}>{trip.destination}</Text>
                <Text style={styles.tripDate}>{trip.date}</Text>
                <Text style={styles.tripCost}>${trip.cost.toLocaleString()}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🏆 Achievements</Text>
            <Text style={styles.viewAllText}>{getUnlockedAchievements().length}/{achievements.length}</Text>
          </View>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementCardLocked,
                ]}
              >
                <Text style={styles.achievementIcon}>
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </Text>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  {!achievement.unlocked && achievement.progress && (
                    <Text style={styles.achievementProgress}>
                      Progress: {achievement.progress}%
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
