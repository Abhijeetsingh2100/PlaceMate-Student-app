import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { supabase } from '../../lib/supabase';
import { useAuth } from '@clerk/clerk-expo';

export default function Reports() {
  const { userId } = useAuth();
  const [dsaCount, setDsaCount] = useState(8);
  const [hours, setHours] = useState(4.5);
  const [topics, setTopics] = useState('');
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', userId)
      .order('id', { ascending: false });
    if (data && !error) {
      setHistory(data);
    }
  };

  const handleLogActivity = async () => {
    if (!topics) {
      Alert.alert('Missing Field', 'Please enter at least one topic covered.');
      return;
    }

    const todayString = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newReport = {
      id: Date.now().toString(),
      user_id: userId,
      dsa_count: dsaCount.toString(),
      hours: hours.toString(),
      topics,
      notes,
      date: todayString,
    };

    const { error } = await supabase.from('reports').insert([newReport]);
    if (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save report.');
      return;
    }

    setTopics('');
    setNotes('');
    fetchReports();
  };

  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const dateString = today.toLocaleDateString('en-US', dateOptions);

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View
          className="mx-4 mt-4 flex-row items-center justify-center rounded-3xl bg-white px-4 py-3"
          style={{ elevation: 8 }}>
          <Image
            source={require('../../assets/images/screenlogo.png')}
            className="h-14 w-14 rounded-full"
          />
          <Text className="items-center justify-center px-4 text-2xl font-bold text-[#3525CD]">
            PlaceMate
          </Text>
        </View>

        {/* Title Section */}
        <View className="mt-8 px-5">
          <Text className="text-3xl font-bold text-[#1F2937]">Daily Report</Text>
          <Text className="mt-1 text-sm text-gray-500">
            Log your prep activities for {dateString}
          </Text>
        </View>

        {/* Activity Log Form Card */}
        <View
          className="mx-4 mt-6 rounded-3xl bg-white p-5"
          style={{
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          }}>
          {/* DSA Questions */}
          <View className="mb-6 flex-row items-center justify-between">
            <View>
              <Text className="font-semibold text-gray-800">DSA Questions</Text>
              <Text className="text-xs text-gray-500">Solved today</Text>
            </View>
            <View className="flex-row items-center rounded-full bg-blue-50/50 p-1">
              <TouchableOpacity
                onPress={() => setDsaCount(Math.max(0, dsaCount - 1))}
                className="h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
                style={{ elevation: 2 }}>
                <Feather name="minus" size={16} color="#3525CD" />
              </TouchableOpacity>
              <Text className="mx-4 font-semibold text-gray-800">{dsaCount}</Text>
              <TouchableOpacity
                onPress={() => setDsaCount(dsaCount + 1)}
                className="h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
                style={{ elevation: 2 }}>
                <Feather name="plus" size={16} color="#3525CD" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Hours Studied with Slider */}
          <View className="mb-6 border-b border-gray-100 pb-4">
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="font-semibold text-gray-800">Hours Studied</Text>
              <View className="flex-row items-center">
                <Text className="font-semibold text-[#3525CD]">{hours.toFixed(1)} hrs</Text>
              </View>
            </View>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={12}
              step={0.5}
              value={hours}
              onValueChange={setHours}
              minimumTrackTintColor="#3525CD"
              maximumTrackTintColor="#D1D5DB"
              thumbTintColor="#3525CD"
            />
          </View>

          {/* Topics Covered */}
          <View className="mb-5">
            <Text className="mb-2 text-xs font-bold text-gray-500">TOPICS COVERED</Text>
            <TextInput
              value={topics}
              onChangeText={setTopics}
              placeholder="e.g., Dynamic Programming, Graphs"
              placeholderTextColor="#9CA3AF"
              className="rounded-2xl bg-gray-50 p-4 text-gray-800"
            />
          </View>

          {/* Notes & Hurdles */}
          <View className="mb-6">
            <Text className="mb-2 text-xs font-bold text-gray-500">NOTES & HURDLES</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="What did you learn today?"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="h-24 rounded-2xl bg-gray-50 p-4 text-gray-800"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleLogActivity}
            className="flex-row items-center justify-center rounded-2xl bg-[#3525CD] p-4"
            style={{ elevation: 4 }}>
            <Text className="mr-2 font-bold text-white">Log Activity</Text>
            <Feather name="send" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* History Section */}
        <View className="mt-8 px-4">
          <View className="mb-4 flex-row items-end justify-between">
            <Text className="text-lg font-bold text-gray-800">Recent Logs</Text>
            <TouchableOpacity>
              <Text className="font-bold text-[#3525CD]">VIEW ALL</Text>
            </TouchableOpacity>
          </View>

          {/* History List from Supabase */}
          {history.length === 0 ? (
            <Text className="mt-4 text-center text-gray-400">No logs found. Start studying!</Text>
          ) : (
            history.map((item) => {
              let badgeDate = item.date;
              try {
                const parts = item.date.split(' ');
                if (parts.length >= 2) {
                  badgeDate = `${parts[0].toUpperCase()}\n${parts[1].replace(',', '')}`;
                }
              } catch (e) {}

              const isRest = parseFloat(item.hours) === 0 && parseInt(item.dsa_count) === 0;

              return (
                <TouchableOpacity
                  key={item.id}
                  className="mb-3 flex-row items-center overflow-hidden rounded-2xl bg-white p-4"
                  style={{ elevation: 3 }}>
                  <View
                    className="absolute bottom-0 left-0 top-0 w-1.5"
                    style={{ backgroundColor: isRest ? '#D1D5DB' : '#34D399' }}
                  />

                  <View
                    className={`ml-1 h-12 w-12 items-center justify-center rounded-xl ${
                      isRest ? 'bg-gray-100' : 'bg-emerald-100/60'
                    }`}>
                    <Text
                      className={`text-center text-[10px] font-bold ${
                        isRest ? 'text-gray-500' : 'text-emerald-500'
                      }`}>
                      {badgeDate}
                    </Text>
                  </View>

                  <View className="ml-4 flex-1">
                    <View className="flex-row items-center">
                      <Text className="text-base font-bold text-gray-800" numberOfLines={1}>
                        {item.topics}
                      </Text>
                    </View>
                    <Text className="mt-0.5 text-xs text-gray-500">
                      {item.dsa_count} Questions • {item.hours} hrs
                    </Text>
                  </View>

                  <Feather name="chevron-right" size={20} color="#D1D5DB" />
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
