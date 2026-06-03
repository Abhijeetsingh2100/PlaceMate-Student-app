import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PrivacyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="h-10 w-10 items-center justify-center rounded-full bg-gray-50">
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#1F2937]">Privacy & Security</Text>
        <View className="h-10 w-10" />
      </View>

      <ScrollView className="flex-1 px-5 py-4" showsVerticalScrollIndicator={false}>
        
        {/* Intro */}
        <View className="mb-8 items-center pt-4">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-blue-50">
            <Feather name="shield" size={40} color="#3525CD" />
          </View>
          <Text className="text-center text-2xl font-bold text-[#1F2937]">Your Data is Safe</Text>
          <Text className="mt-2 text-center text-base text-gray-500">
            At PlaceMate, we take your privacy and security seriously. Learn how we protect your information.
          </Text>
        </View>

        {/* Section 1: Authentication */}
        <View className="mb-6 rounded-2xl bg-gray-50 p-5">
          <View className="mb-3 flex-row items-center">
            <Feather name="lock" size={20} color="#3525CD" />
            <Text className="ml-3 text-lg font-bold text-[#1F2937]">Bank-Grade Security</Text>
          </View>
          <Text className="text-base leading-6 text-gray-600">
            Your account is secured by <Text className="font-bold">Clerk</Text>, an industry-leading authentication provider. We do not store your passwords on our servers. All logins are encrypted and handled via secure JWT tokens.
          </Text>
        </View>

        {/* Section 2: Data Isolation */}
        <View className="mb-6 rounded-2xl bg-gray-50 p-5">
          <View className="mb-3 flex-row items-center">
            <Feather name="database" size={20} color="#3525CD" />
            <Text className="ml-3 text-lg font-bold text-[#1F2937]">Strict Data Isolation</Text>
          </View>
          <Text className="text-base leading-6 text-gray-600">
            Your job applications and study reports are stored in <Text className="font-bold">Supabase</Text> and are tied strictly to your unique, private User ID. Thanks to strict Row Level Security (RLS) and hardcoded ID checks, it is mathematically impossible for other users to view or edit your data.
          </Text>
        </View>

        {/* Section 3: Privacy Policy */}
        <View className="mb-6 rounded-2xl bg-gray-50 p-5">
          <View className="mb-3 flex-row items-center">
            <Feather name="eye-off" size={20} color="#3525CD" />
            <Text className="ml-3 text-lg font-bold text-[#1F2937]">What We Collect</Text>
          </View>
          <Text className="text-base leading-6 text-gray-600">
            We only collect the minimum data necessary to run the app:
          </Text>
          <View className="mt-2 pl-2">
            <Text className="mb-1 text-gray-600">• Email Address (for login only)</Text>
            <Text className="mb-1 text-gray-600">• First and Last Name (for personalization)</Text>
            <Text className="mb-1 text-gray-600">• Profile Picture (optional)</Text>
            <Text className="mb-1 text-gray-600">• Your explicitly entered application/study data</Text>
          </View>
        </View>

        {/* Section 4: Deletion */}
        <View className="mb-10 rounded-2xl bg-red-50 p-5">
          <View className="mb-3 flex-row items-center">
            <Feather name="trash-2" size={20} color="#EF4444" />
            <Text className="ml-3 text-lg font-bold text-red-500">Right to Delete</Text>
          </View>
          <Text className="text-base leading-6 text-gray-600">
            You own your data. If you delete an application or a report, it is permanently destroyed from our databases. 
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
