import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {
  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}>
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

        {/* Greeting */}
        <View className="mt-8 px-5">
          <Text className="text-3xl font-bold text-[#1E1E1E]">Hi, Abhijeet 👋</Text>

          <Text className="mt-2 text-base text-[#6B7280]">
            Your placement journey is looking strong today.
          </Text>
        </View>

        {/* Statistics */}
        <View className="mt-6 px-4">
          <View className="flex-row justify-between">
            {/* Applications */}
            <View className="h-28 w-[48%] rounded-2xl bg-white p-4" style={{ elevation: 6 }}>
              <Text className="text-3xl font-bold text-[#3525CD]">12</Text>

              <Text className="mt-1 text-gray-500">Applications</Text>
            </View>

            {/* Active */}
            <View className="h-28 w-[48%] rounded-2xl bg-white p-4" style={{ elevation: 6 }}>
              <Text className="text-3xl font-bold text-green-600">5</Text>

              <Text className="mt-1 text-gray-500">Active</Text>
            </View>
          </View>

          <View className="mt-4 flex-row justify-between">
            {/* Rejected */}
            <View className="h-28 w-[48%] rounded-2xl bg-white p-4" style={{ elevation: 6 }}>
              <Text className="text-3xl font-bold text-red-500">2</Text>

              <Text className="mt-1 text-gray-500">Rejected</Text>
            </View>

            {/* Offers */}
            <View className="h-28 w-[48%] rounded-2xl bg-white p-4" style={{ elevation: 6 }}>
              <Text className="text-3xl font-bold text-yellow-600">1</Text>

              <Text className="mt-1 text-gray-500">Offers</Text>
            </View>
          </View>
        </View>
        <View className="mt-8 px-4">
          <Text className="mb-4 text-2xl font-bold">Quick Actions</Text>

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="h-20 w-[31%] items-center justify-center rounded-2xl bg-[#3525CD]"
              
              style={{ elevation: 4 }}>
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text className="mt-1 font-semibold text-white">Add App</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="h-20 w-[31%] items-center justify-center rounded-2xl bg-white"
              style={{ elevation: 4 }}>
              <Ionicons name="book-outline" size={24} color="#3525CD" />
              <Text className="mt-1 font-semibold">Study</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="h-20 w-[31%] items-center justify-center rounded-2xl bg-white"
              style={{ elevation: 4 }}>
              <Ionicons name="calendar-outline" size={24} color="#3525CD" />
              <Text className="mt-1 font-semibold">Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          className="mx-4 mt-6 rounded-3xl bg-white p-5"
          style={{
            elevation: 6,
          }}>
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-[#1F2937]">Monthly Trend</Text>

            <Text className="font-medium text-gray-500">Apps per Month</Text>
          </View>

          {/* Chart */}
          <View className="mt-8 h-40 flex-row items-end justify-between">
            <View className="items-center">
              <View className="h-16 w-12 rounded-t-xl bg-gray-200" />
              <Text className="mt-3 text-gray-600">Jan</Text>
            </View>

            <View className="items-center">
              <View className="h-24 w-12 rounded-t-xl bg-gray-200" />
              <Text className="mt-3 text-gray-600">Feb</Text>
            </View>

            <View className="items-center">
              <View className="h-36 w-12 rounded-t-xl bg-[#3525CD]" />
              <Text className="mt-3 text-gray-600">Mar</Text>
            </View>

            <View className="items-center">
              <View className="h-20 w-12 rounded-t-xl bg-gray-200" />
              <Text className="mt-3 text-gray-600">Apr</Text>
            </View>

            <View className="items-center">
              <View className="h-28 w-12 rounded-t-xl bg-gray-200" />
              <Text className="mt-3 text-gray-600">May</Text>
            </View>

            <View className="items-center">
              <View className="h-12 w-12 rounded-t-xl bg-gray-200" />
              <Text className="mt-3 text-gray-600">Jun</Text>
            </View>
          </View>
        </View>
        <View className="mb-8 mt-6 px-4">
          <Text className="mb-4 text-2xl font-bold text-[#1F2937]">Recent Activity</Text>

          {/* Activity 1 */}
          <View
            className="mb-4 flex-row items-center justify-between rounded-2xl bg-white p-4"
            style={{
              elevation: 4,
            }}>
            <View className="flex-1 flex-row items-center">
              <View className="h-14 w-14 items-center justify-center rounded-full bg-green-200">
                <Text className="text-2xl">💼</Text>
              </View>

              <View className="ml-4 flex-1">
                <Text className="text-xl font-bold">Offer Received</Text>

                <Text className="text-lg text-gray-500">Google • Software Engineer</Text>
              </View>
            </View>

            <Text className="font-semibold text-gray-400">2h ago</Text>
          </View>

          {/* Activity 2 */}
          <View
            className="flex-row items-center justify-between rounded-2xl bg-white p-4"
            style={{
              elevation: 4,
            }}>
            <View className="flex-1 flex-row items-center">
              <View className="h-14 w-14 items-center justify-center rounded-full bg-[#4F46E5]">
                <Text className="text-2xl text-white">📋</Text>
              </View>

              <View className="ml-4 flex-1">
                <Text className="text-xl font-bold">Task Completed</Text>

                <Text className="text-lg text-gray-500">Updated Portfolio Resume</Text>
              </View>
            </View>

            <Text className="font-semibold text-gray-400">Yesterday</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
