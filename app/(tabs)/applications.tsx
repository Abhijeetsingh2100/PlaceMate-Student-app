import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

import { useApplications, Application } from '../../context/ApplicationsContext';

const FILTERS = ['All', 'Applied', 'OA', 'Interview', 'Rejected'];

export default function Applications() {
  const { applications, setApplications, modalVisible, setModalVisible } = useApplications();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const getCompanyDomain = (companyName: string) => {
    const cleanName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${cleanName}.com`;
  };

  // Form state
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [salary, setSalary] = useState('');
  const [notes, setNotes] = useState('');

  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        selectedFilter === 'All' || app.status.toLowerCase() === selectedFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [applications, searchQuery, selectedFilter]);

  const activeRoundsCount = applications.filter(
    (app) => !['Rejected', 'Offer'].includes(app.status)
  ).length;

  const handleAddApplication = () => {
    if (!company || !role) return;

    let statusColor = 'text-[#3525CD]';
    if (status === 'Applied') statusColor = 'text-green-600';
    if (status === 'Interview') statusColor = 'text-[#A16207]';
    if (status === 'Rejected') statusColor = 'text-red-500';

    const newApp: Application = {
      id: Date.now().toString(),
      company,
      role,
      status,
      salary: salary || 'N/A',
      date: 'Just now',
      icon: company.charAt(0).toUpperCase(),
      iconBg: 'bg-gray-200',
      statusColor,
    };

    setApplications([newApp, ...applications]);
    setCompany('');
    setRole('');
    setSalary('');
    setStatus('Applied');
    setNotes('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View
          className="mx-4 mt-4 flex-row items-center justify-between rounded-3xl bg-white px-4 py-3"
          style={{
            elevation: 8,
          }}>
          <Image
            source={require('../../assets/images/avatar1.png')}
            className="h-14 w-14 rounded-full"
          />

          <Text className="text-2xl font-bold text-[#3525CD]">PlaceMate</Text>

          <TouchableOpacity
            className="h-12 w-12 items-center justify-center rounded-2xl bg-white"
            style={{
              elevation: 4,
            }}>
            <Ionicons name="notifications-outline" size={24} color="#3525CD" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="mx-4 mt-6 h-14 flex-row items-center rounded-2xl bg-white px-4">
          <Feather name="search" size={20} color="#6B7280" />
          <TextInput
            placeholder="Search applications..."
            className="ml-3 flex-1"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
          contentContainerStyle={{ paddingHorizontal: 16 }}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              className={`mr-3 h-9 items-center justify-center rounded-full px-6 ${selectedFilter === filter ? 'bg-[#3525CD]' : 'bg-[#E5E7EB]'}`}>
              <Text
                className={`font-semibold ${selectedFilter === filter ? 'text-white' : 'text-gray-600'}`}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Active Rounds */}
        <View className="mx-4 mt-6 flex-row items-center justify-between">
          <Text className="text-2xl font-bold">Applications</Text>
          <View className="rounded-xl bg-[#E5E7EB] px-3 py-1">
            <Text className="font-semibold text-gray-600">{activeRoundsCount} Active</Text>
          </View>
        </View>

        {/* Applications List */}
        {filteredApps.map((app) => (
          <View
            key={app.id}
            className="mx-4 mt-4 flex-row rounded-3xl bg-white p-4"
            style={{ elevation: 4 }}>
            {imageErrors[app.id] ? (
              <View className={`h-12 w-12 items-center justify-center rounded-xl ${app.iconBg}`}>
                <Text className={`font-bold ${app.iconColor || 'text-black'}`}>{app.icon}</Text>
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
              <Text className={`text-xl font-bold uppercase ${app.statusColor}`}>{app.status}</Text>
              <Text className="mt-1 text-2xl">{app.company}</Text>
              <Text className="text-gray-500">{app.role}</Text>
            </View>
            <View className="items-end">
              <Text className="text-xl font-bold text-[#3525CD]">{app.salary}</Text>
              <Text className="mt-2 text-gray-500">{app.date}</Text>
            </View>
          </View>
        ))}
        {filteredApps.length === 0 && (
          <View className="mx-4 mt-10 items-center justify-center">
            <Text className="text-gray-500">No applications found.</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-6 right-6 h-16 w-16 items-center justify-center rounded-2xl bg-[#3525CD]"
        style={{ elevation: 10 }}>
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>

      {/* Add Application Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-end bg-black/50">
          <View className="rounded-t-3xl bg-white p-6 pb-10" style={{ elevation: 10 }}>
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-[#3525CD]">New Application</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text className="mb-2 font-semibold text-gray-700">Company Name</Text>
            <TextInput
              placeholder="e.g. Amazon"
              value={company}
              onChangeText={setCompany}
              className="mb-4 rounded-xl border border-gray-300 px-4 py-3"
            />

            <Text className="mb-2 font-semibold text-gray-700">Job Role</Text>
            <TextInput
              placeholder="e.g. Software Engineer"
              value={role}
              onChangeText={setRole}
              className="mb-4 rounded-xl border border-gray-300 px-4 py-3"
            />

            <Text className="mb-2 font-semibold text-gray-700">Expected Salary</Text>
            <TextInput
              placeholder="e.g. $100k"
              value={salary}
              onChangeText={setSalary}
              className="mb-4 rounded-xl border border-gray-300 px-4 py-3"
            />

            <Text className="mb-2 font-semibold text-gray-700">Status</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-5 max-h-12 min-h-[48px]">
              {['Applied', 'OA', 'Interview', 'Offer', 'Rejected'].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setStatus(item)}
                  className={`mr-3 h-10 items-center justify-center rounded-full px-5 ${status === item ? 'bg-[#3525CD]' : 'bg-gray-200'}`}>
                  <Text
                    className={`font-semibold ${status === item ? 'text-white' : 'text-gray-700'}`}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={handleAddApplication}
              className="mt-2 h-14 items-center justify-center rounded-xl bg-[#3525CD]"
              style={{ elevation: 6 }}>
              <Text className="text-lg font-bold text-white">Save Application</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
