import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { useApplications } from '../../context/ApplicationsContext';

// Helper to get company domain for icon
const getCompanyDomain = (companyName: string) => {
  const cleanName = companyName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
  return `${cleanName}.com`;
};

// Helper to get status styling
const getStatusStyles = (status: string) => {
  if (status === 'Applied') return 'text-green-600 bg-green-100';
  if (status === 'Interview') return 'text-[#A16207] bg-yellow-100';
  if (status === 'Rejected') return 'text-red-500 bg-red-100';
  if (status === 'Offer') return 'text-[#3525CD] bg-blue-100';
  return 'text-gray-600 bg-gray-100';
};

export default function Schedule() {
  const { applications } = useApplications();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  // Get current date string in YYYY-MM-DD
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  // Filter apps that have a valid event_date
  const scheduledApps = useMemo(() => {
    return applications.filter((app: any) => app.event_date && app.event_date.length === 10);
  }, [applications]);

  // Generate markedDates object for the calendar
  const markedDates = useMemo(() => {
    const dates: any = {};

    // Mark all dates with events
    scheduledApps.forEach((app: any) => {
      dates[app.event_date] = { marked: true, dotColor: '#3525CD' };
    });

    // Highlight the selected date
    if (dates[selectedDate]) {
      dates[selectedDate] = { ...dates[selectedDate], selected: true, selectedColor: '#3525CD' };
    } else {
      dates[selectedDate] = { selected: true, selectedColor: '#3525CD' };
    }

    return dates;
  }, [scheduledApps, selectedDate]);

  // Apps for the selected date
  const selectedApps = useMemo(() => {
    return scheduledApps.filter((app: any) => app.event_date === selectedDate);
  }, [scheduledApps, selectedDate]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View
        className="mx-4 mt-4 mb-4 flex-row items-center justify-center rounded-3xl bg-white px-4 py-3"
        style={{ elevation: 8 }}>
        <Image
          source={require('../../assets/images/avatar1.png')}
          className="h-14 w-14 rounded-full"
        />

        <Text className="items-center justify-center px-4 text-2xl font-bold text-[#3525CD]">
          PlaceMate
        </Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <Text className="mb-4 mt-2 text-2xl font-bold text-[#1F2937]">Your Schedule</Text>

        {/* Calendar View */}
        <View className="overflow-hidden rounded-3xl bg-white" style={{ elevation: 4 }}>
          <Calendar
            onDayPress={(day: any) => {
              setSelectedDate(day.dateString);
            }}
            markedDates={markedDates}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#3525CD',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#3525CD',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#3525CD',
              selectedDotColor: '#ffffff',
              arrowColor: '#3525CD',
              monthTextColor: '#1F2937',
              indicatorColor: '#3525CD',
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          />
        </View>

        {/* Selected Date Events */}
        <View className="mb-8 mt-6">
          <Text className="mb-4 text-xl font-bold text-[#1F2937]">Events on {selectedDate}</Text>

          {selectedApps.length > 0 ? (
            selectedApps.map((app: any) => {
              const statusStyle = getStatusStyles(app.status);
              return (
                <View
                  key={app.id}
                  className="mb-4 flex-row items-center justify-between rounded-2xl bg-white p-4"
                  style={{ elevation: 3 }}>
                  <View className="flex-1 flex-row items-center">
                    {imageErrors[app.id] ? (
                      <View
                        className={`h-12 w-12 items-center justify-center rounded-xl bg-gray-200`}>
                        <Text className="text-xl">{app.icon}</Text>
                      </View>
                    ) : (
                      <Image
                        source={{ uri: `https://icon.horse/icon/${getCompanyDomain(app.company)}` }}
                        className="rounded-xl bg-white"
                        style={{ width: 48, height: 48 }}
                        resizeMode="contain"
                        onError={() => setImageErrors((prev) => ({ ...prev, [app.id]: true }))}
                      />
                    )}
                    <View className="ml-4 flex-1">
                      <View className="mb-1 flex-row items-center">
                        <Text className="mr-2 text-xl font-bold">{app.company}</Text>
                        <View className={`rounded-full px-2 py-0.5 ${statusStyle.split(' ')[1]}`}>
                          <Text className={`text-xs font-bold ${statusStyle.split(' ')[0]}`}>
                            {app.status}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-gray-500" numberOfLines={1}>
                        {app.role}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View
              className="items-center justify-center rounded-2xl bg-white p-8"
              style={{ elevation: 2 }}>
              <Ionicons name="calendar-clear-outline" size={48} color="#9CA3AF" />
              <Text className="mt-4 text-lg font-medium text-gray-500">No events scheduled</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
