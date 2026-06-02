import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AddApplication() {
  const router = useRouter();

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [salary, setSalary] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    console.log({
      company,
      role,
      status,
      salary,
      notes,
    });

    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}>
        {/* Header */}
        <View className="mt-4 flex-row items-center px-5">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#3525CD" />
          </TouchableOpacity>

          <Text className="ml-4 text-3xl font-bold text-[#3525CD]">Add Application</Text>
        </View>

        {/* Form Card */}
        <View
          className="mx-4 mt-6 rounded-3xl bg-white p-5"
          style={{
            elevation: 6,
          }}>
          {/* Company */}
          <Text className="mb-2 font-semibold text-gray-700">Company Name</Text>

          <TextInput
            placeholder="Google"
            value={company}
            onChangeText={setCompany}
            className="mb-5 rounded-xl border border-gray-300 px-4 py-4"
          />

          {/* Role */}
          <Text className="mb-2 font-semibold text-gray-700">Job Role</Text>

          <TextInput
            placeholder="SDE Intern"
            value={role}
            onChangeText={setRole}
            className="mb-5 rounded-xl border border-gray-300 px-4 py-4"
          />

          {/* Salary */}
          <Text className="mb-2 font-semibold text-gray-700">Expected Salary</Text>

          <TextInput
            placeholder="$120k"
            value={salary}
            onChangeText={setSalary}
            className="mb-5 rounded-xl border border-gray-300 px-4 py-4"
          />

          {/* Status */}
          <Text className="mb-3 font-semibold text-gray-700">Status</Text>

          <View className="flex-row flex-wrap">
            {['Applied', 'OA', 'Interview', 'Offer', 'Rejected'].map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setStatus(item)}
                className={`mb-3 mr-3 rounded-full px-4 py-2 ${
                  status === item ? 'bg-[#3525CD]' : 'bg-gray-200'
                }`}>
                <Text
                  className={`font-semibold ${status === item ? 'text-white' : 'text-gray-700'}`}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Notes */}
          <Text className="mb-2 mt-3 font-semibold text-gray-700">Notes</Text>

          <TextInput
            placeholder="Interview date, recruiter details, etc."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            className="h-32 rounded-xl border border-gray-300 px-4 py-4"
          />

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            className="mt-8 h-14 items-center justify-center rounded-xl bg-[#3525CD]"
            style={{
              elevation: 6,
            }}>
            <Text className="text-lg font-bold text-white">Save Application</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
