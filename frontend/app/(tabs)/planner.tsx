import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface Interest {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
}

interface BudgetRange {
  id: string;
  label: string;
  min: number;
  max: number;
  selected: boolean;
}

export default function TripPlannerScreen() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Form state
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState('1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  // Interests state
  const [interests, setInterests] = useState<Interest[]>([
    { id: '1', name: 'Adventure', icon: '🏔️', selected: false },
    { id: '2', name: 'Culture', icon: '🏛️', selected: false },
    { id: '3', name: 'Food', icon: '🍜', selected: false },
    { id: '4', name: 'Nature', icon: '🌲', selected: false },
    { id: '5', name: 'Beach', icon: '🏖️', selected: false },
    { id: '6', name: 'Nightlife', icon: '🌃', selected: false },
    { id: '7', name: 'Shopping', icon: '🛍️', selected: false },
    { id: '8', name: 'History', icon: '📜', selected: false },
    { id: '9', name: 'Photography', icon: '📸', selected: false },
    { id: '10', name: 'Wellness', icon: '🧘', selected: false },
    { id: '11', name: 'Art', icon: '🎨', selected: false },
    { id: '12', name: 'Music', icon: '🎵', selected: false },
  ]);

  // Budget ranges
  const [budgetRanges, setBudgetRanges] = useState<BudgetRange[]>([
    { id: '1', label: 'Budget', min: 0, max: 1000, selected: false },
    { id: '2', label: 'Mid-range', min: 1000, max: 3000, selected: false },
    { id: '3', label: 'Luxury', min: 3000, max: 10000, selected: false },
    { id: '4', label: 'Premium', min: 10000, max: 50000, selected: false },
  ]);

  const toggleInterest = (id: string) => {
    setInterests(prev => prev.map(interest => 
      interest.id === id ? { ...interest, selected: !interest.selected } : interest
    ));
  };

  const toggleBudget = (id: string) => {
    setBudgetRanges(prev => prev.map(budget => 
      budget.id === id ? { ...budget, selected: !budget.selected } : { ...budget, selected: false }
    ));
  };

  const getSelectedInterests = () => {
    return interests.filter(interest => interest.selected);
  };

  const getSelectedBudget = () => {
    return budgetRanges.find(budget => budget.selected);
  };

  const handleGenerateItinerary = async () => {
    if (!destination || !startDate || !endDate) {
      Alert.alert('Missing Information', 'Please fill in destination and dates');
      return;
    }

    const selectedInterests = getSelectedInterests();
    const selectedBudget = getSelectedBudget();

    if (selectedInterests.length === 0) {
      Alert.alert('Select Interests', 'Please select at least one interest');
      return;
    }

    if (!selectedBudget) {
      Alert.alert('Select Budget', 'Please select a budget range');
      return;
    }

    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      Alert.alert(
        'Itinerary Generated!',
        `Your personalized ${destination} trip has been created based on your preferences for ${selectedInterests.map(i => i.name).join(', ')} within a ${selectedBudget.label} budget.`,
        [
          { text: 'View Itinerary', onPress: () => router.push('/itinerary') },
          { text: 'OK' }
        ]
      );
    }, 3000);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingBottom: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.7,
      marginBottom: 20,
    },
    scrollContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.background,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
    },
    flex1: {
      flex: 1,
    },
    button: {
      backgroundColor: colors.tint,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonDisabled: {
      backgroundColor: colors.text,
      opacity: 0.3,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    preferenceButton: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
    },
    preferenceButtonSelected: {
      borderColor: colors.tint,
      backgroundColor: colors.tint + '10',
    },
    preferenceButtonText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    preferenceButtonTextSelected: {
      color: colors.tint,
      fontWeight: '600',
    },
    interestsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    interestChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    interestChipSelected: {
      borderColor: colors.tint,
      backgroundColor: colors.tint + '10',
    },
    interestIcon: {
      fontSize: 16,
      marginRight: 6,
    },
    interestText: {
      fontSize: 14,
      color: colors.text,
    },
    interestTextSelected: {
      color: colors.tint,
      fontWeight: '600',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderRadius: 20,
      padding: 20,
      width: width * 0.9,
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 15,
      right: 15,
      padding: 5,
    },
    closeButtonText: {
      fontSize: 24,
      color: colors.text,
      opacity: 0.7,
    },
    selectedCount: {
      fontSize: 12,
      color: colors.tint,
      fontWeight: '600',
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      marginLeft: 10,
      fontSize: 16,
      color: colors.text,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={styles.title}>AI Trip Planner</Text>
        <Text style={styles.subtitle}>Create your perfect personalized itinerary</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Destination */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Destination</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Where do you want to go?"
              placeholderTextColor={colors.text + '60'}
              value={destination}
              onChangeText={setDestination}
            />
          </View>
        </View>

        {/* Dates and Travelers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Trip Details</Text>
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.flex1]}>
              <Text style={styles.label}>Start Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.text + '60'}
                value={startDate}
                onChangeText={setStartDate}
              />
            </View>
            <View style={[styles.inputContainer, styles.flex1]}>
              <Text style={styles.label}>End Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.text + '60'}
                value={endDate}
                onChangeText={setEndDate}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Number of Travelers</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              placeholderTextColor={colors.text + '60'}
              value={travelers}
              onChangeText={setTravelers}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Budget */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Budget Range</Text>
          <TouchableOpacity
            style={styles.preferenceButton}
            onPress={() => setShowBudgetModal(true)}
          >
            <Text style={[
              styles.preferenceButtonText,
              getSelectedBudget() && styles.preferenceButtonTextSelected
            ]}>
              {getSelectedBudget() ? getSelectedBudget()?.label : 'Select your budget range'}
            </Text>
            <Text style={styles.selectedCount}>
              {getSelectedBudget() ? `$${getSelectedBudget()?.min}-$${getSelectedBudget()?.max}` : ''}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Travel Interests</Text>
          <TouchableOpacity
            style={styles.preferenceButton}
            onPress={() => setShowInterestsModal(true)}
          >
            <Text style={[
              styles.preferenceButtonText,
              getSelectedInterests().length > 0 && styles.preferenceButtonTextSelected
            ]}>
              {getSelectedInterests().length > 0 
                ? `${getSelectedInterests().length} interests selected`
                : 'Select your interests'
              }
            </Text>
            <Text style={styles.selectedCount}>
              {getSelectedInterests().length > 0 ? 'Tap to edit' : ''}
            </Text>
          </TouchableOpacity>
          
          {/* Quick preview of selected interests */}
          {getSelectedInterests().length > 0 && (
            <View style={[styles.interestsGrid, { marginTop: 12 }]}>
              {getSelectedInterests().slice(0, 3).map(interest => (
                <View key={interest.id} style={styles.interestChip}>
                  <Text style={styles.interestIcon}>{interest.icon}</Text>
                  <Text style={styles.interestText}>{interest.name}</Text>
                </View>
              ))}
              {getSelectedInterests().length > 3 && (
                <View style={styles.interestChip}>
                  <Text style={styles.interestText}>+{getSelectedInterests().length - 3} more</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          style={[
            styles.button,
            isGenerating && styles.buttonDisabled,
          ]}
          onPress={handleGenerateItinerary}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <View style={styles.loadingContainer}>
              <Text>🤖</Text>
              <Text style={styles.loadingText}>AI is creating your itinerary...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>🚀 Generate My Trip</Text>
          )}
        </TouchableOpacity>

        {/* Bottom padding for scroll */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Budget Modal */}
      <Modal
        visible={showBudgetModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowBudgetModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowBudgetModal(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Budget Range</Text>
            {budgetRanges.map(budget => (
              <TouchableOpacity
                key={budget.id}
                style={[
                  styles.preferenceButton,
                  budget.selected && styles.preferenceButtonSelected,
                  { marginBottom: 12 }
                ]}
                onPress={() => toggleBudget(budget.id)}
              >
                <Text style={[
                  styles.preferenceButtonText,
                  budget.selected && styles.preferenceButtonTextSelected
                ]}>
                  {budget.label}
                </Text>
                <Text style={styles.selectedCount}>
                  ${budget.min.toLocaleString()} - ${budget.max.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Interests Modal */}
      <Modal
        visible={showInterestsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowInterestsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowInterestsModal(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Your Interests</Text>
            <View style={styles.interestsGrid}>
              {interests.map(interest => (
                <TouchableOpacity
                  key={interest.id}
                  style={[
                    styles.interestChip,
                    interest.selected && styles.interestChipSelected,
                    { marginBottom: 8 }
                  ]}
                  onPress={() => toggleInterest(interest.id)}
                >
                  <Text style={styles.interestIcon}>{interest.icon}</Text>
                  <Text style={[
                    styles.interestText,
                    interest.selected && styles.interestTextSelected
                  ]}>
                    {interest.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
