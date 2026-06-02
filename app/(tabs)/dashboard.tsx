import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";


export default function Dashboard() {
  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FC]">
 <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingBottom: 30,
    }}

    >

    
      {/* Header */}
      <View
        className="mx-4 mt-4 bg-white rounded-3xl px-4 py-3 flex-row items-center justify-between"
        style={{
          elevation: 8,
        }}
      >
        <Image
          source={require("../../assets/images/avatar1.png")}
          className="w-14 h-14 rounded-full"
        />

        <Text className="text-2xl font-bold text-[#3525CD]">
          PlaceMate
        </Text>

        <TouchableOpacity
          className="w-12 h-12 rounded-2xl items-center justify-center bg-white"
          style={{
            elevation: 4,
          }}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#3525CD"
          />
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <View className="px-5 mt-8">
        <Text className="text-3xl font-bold text-[#1E1E1E]">
          Hi, Abhijeet 👋
        </Text>

        <Text className="text-base text-[#6B7280] mt-2">
          Your placement journey is looking strong today.
        </Text>
      </View>

      {/* Statistics */}
      <View className="px-4 mt-6">
        <View className="flex-row justify-between">
          {/* Applications */}
          <View
            className="bg-white rounded-2xl w-[48%] h-28 p-4"
            style={{ elevation: 6 }}
          >
            <Text className="text-3xl font-bold text-[#3525CD]">
              12
            </Text>

            <Text className="text-gray-500 mt-1">
              Applications
            </Text>
          </View>

          {/* Active */}
          <View
            className="bg-white rounded-2xl w-[48%] h-28 p-4"
            style={{ elevation: 6 }}
          >
            <Text className="text-3xl font-bold text-green-600">
              5
            </Text>

            <Text className="text-gray-500 mt-1">
              Active
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-4">
          {/* Rejected */}
          <View
            className="bg-white rounded-2xl w-[48%] h-28 p-4"
            style={{ elevation: 6 }}
          >
            <Text className="text-3xl font-bold text-red-500">
              2
            </Text>

            <Text className="text-gray-500 mt-1">
              Rejected
            </Text>
          </View>

          {/* Offers */}
          <View
            className="bg-white rounded-2xl w-[48%] h-28 p-4"
            style={{ elevation: 6 }}
          >
            <Text className="text-3xl font-bold text-yellow-600">
              1
            </Text>

            <Text className="text-gray-500 mt-1">
              Offers
            </Text>
          </View>
        </View>
      </View>
<View className="mt-8 px-4">
  <Text className="text-2xl font-bold mb-4">
    Quick Actions
  </Text>

  <View className="flex-row justify-between">
    <TouchableOpacity
      className="bg-[#3525CD] w-[31%] h-20 rounded-2xl items-center justify-center"
      style={{ elevation: 4 }}
    >
      <Ionicons
        name="add-circle-outline"
        size={24}
        color="white"
      />
      <Text className="text-white font-semibold mt-1">
        Add App
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      className="bg-white w-[31%] h-20 rounded-2xl items-center justify-center"
      style={{ elevation: 4 }}
    >
      <Ionicons
        name="book-outline"
        size={24}
        color="#3525CD"
      />
      <Text className="font-semibold mt-1">
        Study
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      className="bg-white w-[31%] h-20 rounded-2xl items-center justify-center"
      style={{ elevation: 4 }}
    >
      <Ionicons
        name="calendar-outline"
        size={24}
        color="#3525CD"
      />
      <Text className="font-semibold mt-1">
        Schedule
      </Text>
    </TouchableOpacity>
  </View>
</View>
<View
  className="mx-4 mt-6 bg-white rounded-3xl p-5"
  style={{
    elevation: 6,
  }}
>
  <View className="flex-row justify-between items-center">
    <Text className="text-2xl font-bold text-[#1F2937]">
      Monthly Trend
    </Text>

    <Text className="text-gray-500 font-medium">
      Apps per Month
    </Text>
  </View>

  {/* Chart */}
  <View className="flex-row justify-between items-end mt-8 h-40">
    <View className="items-center">
      <View className="w-12 h-16 bg-gray-200 rounded-t-xl" />
      <Text className="mt-3 text-gray-600">Jan</Text>
    </View>

    <View className="items-center">
      <View className="w-12 h-24 bg-gray-200 rounded-t-xl" />
      <Text className="mt-3 text-gray-600">Feb</Text>
    </View>

    <View className="items-center">
      <View className="w-12 h-36 bg-[#3525CD] rounded-t-xl" />
      <Text className="mt-3 text-gray-600">Mar</Text>
    </View>

    <View className="items-center">
      <View className="w-12 h-20 bg-gray-200 rounded-t-xl" />
      <Text className="mt-3 text-gray-600">Apr</Text>
    </View>

    <View className="items-center">
      <View className="w-12 h-28 bg-gray-200 rounded-t-xl" />
      <Text className="mt-3 text-gray-600">May</Text>
    </View>

    <View className="items-center">
      <View className="w-12 h-12 bg-gray-200 rounded-t-xl" />
      <Text className="mt-3 text-gray-600">Jun</Text>
    </View>
  </View>
</View>
<View className="px-4 mt-6 mb-8">
  <Text className="text-2xl font-bold text-[#1F2937] mb-4">
    Recent Activity
  </Text>

  {/* Activity 1 */}
  <View
    className="bg-white rounded-2xl p-4 flex-row items-center justify-between mb-4"
    style={{
      elevation: 4,
    }}
  >
    <View className="flex-row items-center flex-1">
      <View className="w-14 h-14 rounded-full bg-green-200 items-center justify-center">
        <Text className="text-2xl">💼</Text>
      </View>

      <View className="ml-4 flex-1">
        <Text className="text-xl font-bold">
          Offer Received
        </Text>

        <Text className="text-gray-500 text-lg">
          Google • Software Engineer
        </Text>
      </View>
    </View>

    <Text className="text-gray-400 font-semibold">
      2h ago
    </Text>
  </View>

  {/* Activity 2 */}
  <View
    className="bg-white rounded-2xl p-4 flex-row items-center justify-between"
    style={{
      elevation: 4,
    }}
  >
    <View className="flex-row items-center flex-1">
      <View className="w-14 h-14 rounded-full bg-[#4F46E5] items-center justify-center">
        <Text className="text-2xl text-white">📋</Text>
      </View>

      <View className="ml-4 flex-1">
        <Text className="text-xl font-bold">
          Task Completed
        </Text>

        <Text className="text-gray-500 text-lg">
          Updated Portfolio Resume
        </Text>
      </View>
    </View>

    <Text className="text-gray-400 font-semibold">
      Yesterday
    </Text>
  </View>
</View>

</ScrollView>
    </SafeAreaView>
  );
}