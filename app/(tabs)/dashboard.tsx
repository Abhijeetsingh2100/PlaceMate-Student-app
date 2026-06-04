import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useApplications } from '../../context/ApplicationsContext';
import { useUser } from '@clerk/clerk-expo';

export default function Dashboard() {
  const router = useRouter();
  const { applications, setModalVisible, isLoading } = useApplications();
  const { user } = useUser();

  const totalApps = applications.length;
  const activeApps = applications.filter(
    (app) => !['Rejected', 'Offer'].includes(app.status)
  ).length;
  const rejectedApps = applications.filter((app) => app.status === 'Rejected').length;
  const offerApps = applications.filter((app) => app.status === 'Offer').length;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        {/* Header Skeleton */}
        <View
          className="mx-4 mb-4 mt-4 flex-row items-center justify-center rounded-3xl bg-white px-4 py-3"
          style={{ elevation: 8 }}>
          <View className="h-14 w-14 rounded-full bg-gray-200" />
          <View className="ml-4 h-8 w-32 rounded-lg bg-gray-200" />
        </View>

        {/* Greeting Skeleton */}
        <View className="mt-4 px-5">
          <View className="mb-2 h-8 w-48 rounded-lg bg-gray-200" />
          <View className="h-4 w-64 rounded-lg bg-gray-200" />
        </View>

        {/* Stats Grid Skeleton */}
        <View className="mt-8 flex-row flex-wrap justify-between px-4">
          {[1, 2, 3, 4].map((i) => (
            <View key={i} className="mb-4 w-[48%] rounded-3xl bg-white p-5" style={{ elevation: 4 }}>
              <View className="mb-4 h-10 w-10 rounded-full bg-gray-200" />
              <View className="mb-2 h-8 w-16 rounded-lg bg-gray-200" />
              <View className="h-4 w-24 rounded-lg bg-gray-200" />
            </View>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  // Dynamic Recent Activity (Top 3)
  const recentApps = applications.slice(0, 3);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Offer':
        return { icon: '💼', bg: 'bg-green-200' };
      case 'Interview':
        return { icon: '📅', bg: 'bg-purple-200' };
      case 'Rejected':
        return { icon: '❌', bg: 'bg-red-200' };
      default:
        return { icon: '📋', bg: 'bg-blue-100' };
    }
  };

  const getStatusTitle = (status: string) => {
    switch (status) {
      case 'Offer':
        return 'Offer Received';
      case 'Interview':
        return 'Interview Scheduled';
      case 'Rejected':
        return 'Application Rejected';
      case 'OA':
        return 'Online Assessment';
      default:
        return 'Application Submitted';
    }
  };

  // Dynamic Monthly Trend
  const getMonthIndex = (dateStr: string) => {
    if (
      dateStr.includes('now') ||
      dateStr.includes('ago') ||
      dateStr.includes('Today') ||
      dateStr.includes('Yesterday')
    ) {
      return new Date().getMonth();
    }
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const found = months.findIndex((m) => dateStr.includes(m));
    return found !== -1 ? found : new Date().getMonth();
  };

  const monthCounts = new Array(12).fill(0);
  applications.forEach((app) => {
    monthCounts[getMonthIndex(app.date)]++;
  });

  const currentMonth = new Date().getMonth();
  const last6MonthsData = [];
  for (let i = 5; i >= 0; i--) {
    let m = currentMonth - i;
    if (m < 0) m += 12;
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    last6MonthsData.push({ month: months[m], count: monthCounts[m] });
  }

  const maxCount = Math.max(...last6MonthsData.map((d) => d.count), 1);

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}>
        {/* Header */}
        <View
          className="mx-4 mt-4 flex-row items-center justify-center rounded-3xl bg-white px-4 py-3"
          style={{
            elevation: 8,
          }}>
          <Image
            source={require('../../assets/images/screenlogo.png')}
            className="h-14 w-14 rounded-full"
          />

          <Text className="items-center justify-center px-4 text-2xl font-bold text-[#3525CD]">
            PlaceMate
          </Text>

          {/* <TouchableOpacity
            className="h-12 w-12 items-center justify-center rounded-2xl bg-white"
            style={{
              elevation: 4,
            }}>
            <Ionicons name="notifications-outline" size={24} color="#3525CD" />
          </TouchableOpacity> */}
        </View>

        {/* Greeting */}
        <View className="mt-8 px-5">
          <Text className="text-3xl font-bold text-[#1E1E1E]">Hi, {user?.firstName || 'Student'} 👋</Text>

          <Text className="mt-2 text-base text-[#6B7280]">
            Your placement journey is looking strong today.
          </Text>
        </View>

        {/* Statistics */}
        <View className="mt-6 px-4">
          <View className="flex-row justify-between">
            {/* Applications */}
            <View className="h-28 w-[48%] rounded-2xl bg-white p-4" style={{ elevation: 6 }}>
              <Text className="text-3xl font-bold text-[#3525CD]">{totalApps}</Text>

              <Text className="mt-1 text-gray-500">Applications</Text>
            </View>

            {/* Active */}
            <View className="h-28 w-[48%] rounded-2xl bg-white p-4" style={{ elevation: 6 }}>
              <Text className="text-3xl font-bold text-green-600">{activeApps}</Text>

              <Text className="mt-1 text-gray-500">Active</Text>
            </View>
          </View>

          <View className="mt-4 flex-row justify-between">
            {/* Rejected */}
            <View className="h-28 w-[48%] rounded-2xl bg-white p-4" style={{ elevation: 6 }}>
              <Text className="text-3xl font-bold text-red-500">{rejectedApps}</Text>

              <Text className="mt-1 text-gray-500">Rejected</Text>
            </View>

            {/* Offers */}
            <View className="h-28 w-[48%] rounded-2xl bg-white p-4" style={{ elevation: 6 }}>
              <Text className="text-3xl font-bold text-yellow-600">{offerApps}</Text>

              <Text className="mt-1 text-gray-500">Offers</Text>
            </View>
          </View>
        </View>
        <View className="mt-8 px-4">
          <Text className="mb-4 text-2xl font-bold">Quick Actions</Text>

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="h-20 w-[31%] items-center justify-center rounded-2xl bg-[#3525CD]"
              onPress={() => {
                setModalVisible(true);
                router.push('/applications');
              }}
              style={{ elevation: 4 }}>
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text className="mt-1 font-semibold text-white">Add App</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="h-20 w-[31%] items-center justify-center rounded-2xl bg-white"
              onPress={() => router.push('/reports')}
              style={{ elevation: 4 }}>
              <Ionicons name="book-outline" size={24} color="#3525CD" />
              <Text className="mt-1 font-semibold">Study</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="h-20 w-[31%] items-center justify-center rounded-2xl bg-white"
              onPress={() => router.push('/schedule')}
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

            <Text className="font-medium text-gray-500">Apps. per Month</Text>
          </View>

          {/* Chart */}
          <View className="mt-8 h-40 flex-row items-end justify-between">
            {last6MonthsData.map((data, index) => {
              const heightPx = Math.max((data.count / maxCount) * 120, 20); // max 120px, min 20px
              return (
                <View key={index} className="items-center">
                  <View
                    className={`w-11 rounded-t-xl ${index === 5 && data.count > 0 ? 'bg-[#3525CD]' : 'bg-gray-200'}`}
                    style={{ height: heightPx }}
                  />
                  <Text className="mt-3 text-gray-600">{data.month}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View className="mb-8 mt-6 px-4">
          <Text className="mb-4 text-2xl font-bold text-[#1F2937]">Recent Activity</Text>

          {recentApps.map((app) => {
            const { icon, bg } = getStatusIcon(app.status);

            // Calculate dynamic time from the timestamp ID
            let displayTime = app.date;
            const timestamp = parseInt(app.id, 10);
            // Valid timestamp IDs are long (e.g., 171...)
            if (!isNaN(timestamp) && app.id.length > 10) {
              const diffMs = Date.now() - timestamp;
              const diffMins = Math.floor(diffMs / (1000 * 60));
              const diffHrs = Math.floor(diffMins / 60);
              const diffDays = Math.floor(diffHrs / 24);

              if (diffDays > 0) displayTime = `${diffDays}d ago`;
              else if (diffHrs > 0) displayTime = `${diffHrs}h ago`;
              else if (diffMins > 0) displayTime = `${diffMins}m ago`;
              else displayTime = 'Just now';
            }

            return (
              <View
                key={app.id}
                className="mb-4 flex-row items-center justify-between rounded-2xl bg-white p-4"
                style={{ elevation: 4 }}>
                <View className="flex-1 flex-row items-center">
                  <View className={`h-14 w-14 items-center justify-center rounded-full ${bg}`}>
                    <Text className="text-2xl">{icon}</Text>
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-xl font-bold">{getStatusTitle(app.status)}</Text>
                    <Text className="text-lg text-gray-500" numberOfLines={1}>
                      {app.company} • {app.role}
                    </Text>
                  </View>
                </View>
                <Text className="font-semibold text-gray-400">{displayTime}</Text>
              </View>
            );
          })}
          {recentApps.length === 0 && (
            <Text className="mt-4 text-center text-gray-500">No recent activity at the moment .</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
