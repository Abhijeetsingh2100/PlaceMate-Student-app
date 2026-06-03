import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, Modal, TextInput, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useApplications } from '../../context/ApplicationsContext';
import { useAuth, useUser } from '@clerk/clerk-expo';
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { user } = useUser();
  const { applications } = useApplications();

  // Dynamic Stats Calculation
  const totalApps = applications.length;
  const offerApps = applications.filter((app) => app.status === 'Offer').length;
  const interviewApps = applications.filter((app) => app.status === 'Interview').length;
  const activeApps = applications.filter(
    (app) => !['Rejected', 'Offer'].includes(app.status)
  ).length;

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Log Out', 
        style: 'destructive',
        onPress: async () => {
          await signOut();
        }
      },
    ]);
  };

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editFirstName, setEditFirstName] = useState(user?.firstName || '');
  const [editLastName, setEditLastName] = useState(user?.lastName || '');
  const [loadingEdit, setLoadingEdit] = useState(false);

  const openEditModal = () => {
    setEditFirstName(user?.firstName || '');
    setEditLastName(user?.lastName || '');
    setEditModalVisible(true);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setLoadingEdit(true);
    try {
      await user.update({
        firstName: editFirstName,
        lastName: editLastName,
      });
      setEditModalVisible(false);
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Failed to update profile');
    } finally {
      setLoadingEdit(false);
    }
  };

  const pickImage = async () => {
    if (!user) return;
    
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'You need to allow access to your photos to change your profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1, // Drastically reduce size for instant upload!
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setLoadingEdit(true);
      try {
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        await user.setProfileImage({ file: base64Image });
      } catch (err: any) {
        Alert.alert('Error', err.errors?.[0]?.message || 'Failed to upload photo');
      } finally {
        setLoadingEdit(false);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View
        className="mx-4 mb-4 mt-4 flex-row items-center justify-center rounded-3xl bg-white px-4 py-3"
        style={{ elevation: 8 }}>
        <Image
          source={require('../../assets/images/screenlogo.png')}
          className="h-14 w-14 rounded-full"
        />
        <Text className="items-center justify-center px-4 text-2xl font-bold text-[#3525CD]">
          PlaceMate
        </Text>
      </View>
        {/* Identity Card */}
        <View className="mx-4 mt-2 items-center rounded-3xl bg-white p-6" style={{ elevation: 4 }}>
          <View className="relative">
            <Image
              source={user?.imageUrl ? { uri: user.imageUrl } : require('../../assets/images/avatar1.png')}
              className="h-28 w-28 rounded-full border-4 border-gray-50"
            />
            {loadingEdit && (
              <View className="absolute h-28 w-28 items-center justify-center rounded-full bg-black/30">
                <ActivityIndicator color="white" size="large" />
              </View>
            )}
            <TouchableOpacity onPress={pickImage} disabled={loadingEdit} className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#3525CD]">
              <Feather name="camera" size={14} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="mt-4 text-2xl font-bold text-[#1F2937]">{user?.fullName || 'Student'}</Text>
          <Text className="mt-1 text-base font-medium text-gray-500">{user?.primaryEmailAddress?.emailAddress || 'Software Engineering Student'}</Text>
          
          <TouchableOpacity onPress={openEditModal} className="mt-4 rounded-xl bg-gray-100 px-6 py-2">
            <Text className="font-bold text-[#3525CD]">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Live Career Stats Grid */}
        <View className="mx-4 mt-6">
          <Text className="mb-3 text-lg font-bold text-[#1F2937]">Career Stats</Text>
          <View className="flex-row flex-wrap justify-between">
            <View className="mb-4 w-[48%] items-center rounded-3xl bg-white p-4" style={{ elevation: 2 }}>
              <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Ionicons name="document-text" size={20} color="#2563EB" />
              </View>
              <Text className="text-2xl font-bold text-[#1F2937]">{totalApps}</Text>
              <Text className="text-sm text-gray-500">Applied</Text>
            </View>
            <View className="mb-4 w-[48%] items-center rounded-3xl bg-white p-4" style={{ elevation: 2 }}>
              <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Ionicons name="briefcase" size={20} color="#16A34A" />
              </View>
              <Text className="text-2xl font-bold text-[#1F2937]">{offerApps}</Text>
              <Text className="text-sm text-gray-500">Offers</Text>
            </View>
            <View className="mb-4 w-[48%] items-center rounded-3xl bg-white p-4" style={{ elevation: 2 }}>
              <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Ionicons name="calendar" size={20} color="#9333EA" />
              </View>
              <Text className="text-2xl font-bold text-[#1F2937]">{interviewApps}</Text>
              <Text className="text-sm text-gray-500">Interviews</Text>
            </View>
            <View className="mb-4 w-[48%] items-center rounded-3xl bg-white p-4" style={{ elevation: 2 }}>
              <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <MaterialIcons name="pending-actions" size={22} color="#EA580C" />
              </View>
              <Text className="text-2xl font-bold text-[#1F2937]">{activeApps}</Text>
              <Text className="text-sm text-gray-500">Active</Text>
            </View>
          </View>
        </View>

        {/* Settings Menu */}
        <View className="mx-4 mb-8 mt-4 rounded-3xl bg-white p-2" style={{ elevation: 3 }}>
          <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4">
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Feather name="bell" size={20} color="#4B5563" />
              </View>
              <Text className="ml-4 text-base font-semibold text-[#1F2937]">Notifications</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/privacy')} className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4">
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Feather name="lock" size={20} color="#4B5563" />
              </View>
              <Text className="ml-4 text-base font-semibold text-[#1F2937]">Privacy & Security</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('mailto:abhijeet200508@gmail.com')} className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4">
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Feather name="mail" size={20} color="#4B5563" />
              </View>
              <Text className="ml-4 text-base font-semibold text-[#1F2937]">Contact Developer</Text>
            </View>
            <Feather name="external-link" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/abhijeet-singh-a6571b325/')} className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4">
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Feather name="linkedin" size={20} color="#4B5563" />
              </View>
              <Text className="ml-4 text-base font-semibold text-[#1F2937]">LinkedIn Profile</Text>
            </View>
            <Feather name="external-link" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleLogout}
            className="flex-row items-center justify-between px-4 py-4">
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-red-50">
                <Feather name="log-out" size={20} color="#EF4444" />
              </View>
              <Text className="ml-4 text-base font-semibold text-red-500">Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="rounded-t-3xl bg-white p-6 pb-10">
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-gray-800">Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} className="rounded-full bg-gray-100 p-2">
                <Ionicons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            <Text className="mb-2 font-medium text-gray-700">First Name</Text>
            <TextInput
              value={editFirstName}
              onChangeText={setEditFirstName}
              className="mb-4 rounded-xl border border-gray-300 px-4 py-3"
              placeholder="First Name"
            />

            <Text className="mb-2 font-medium text-gray-700">Last Name</Text>
            <TextInput
              value={editLastName}
              onChangeText={setEditLastName}
              className="mb-8 rounded-xl border border-gray-300 px-4 py-3"
              placeholder="Last Name"
            />

            <TouchableOpacity
              onPress={handleSaveProfile}
              disabled={loadingEdit}
              className="h-14 items-center justify-center rounded-xl bg-[#3525CD]"
              style={{ elevation: 2 }}>
              {loadingEdit ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-lg font-bold text-white">Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
