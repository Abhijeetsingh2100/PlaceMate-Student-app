import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

import '../global.css';
import { SafeAreaView } from 'react-native-safe-area-context';

const Onboarding = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="items-center  pt-5">
        <Text className="text-2xl font-bold text-[#3525CD]">Placement Tracker</Text>
      </View>
      <View className=" items-center pt-20">
        <Image
          source={require('../assets/images/image1.png')}
          style={{
            width: 350,
            height: 328,
          }}
        />
      </View>

      <View className="items-center pt-20">
        <Text className="font-inter text-3xl font-bold">Master Your Placement</Text>
        <Text className="font-inter text-3xl font-bold">Journey</Text>
        <Text className="font-inter pt-7 ">Track applications, schedule interviews,</Text>
        <Text className="font-inter">and boost your preparation in one place.</Text>
      </View>
      <View className="mt-8 px-5">
        <TouchableOpacity
          className="mt-8 h-14 items-center justify-center rounded-xl bg-[#3525CD] shadow-xl "
          onPress={() => router.push('/(auth)/sign-up')}>
          <Text className="text-lg font-bold text-white">Get Started</Text>
        </TouchableOpacity>
      </View>
      <View className="px-5 ">
        <TouchableOpacity
          className="mt-4 h-14 items-center justify-center rounded-xl border border-[#6155F5]"
          onPress={() => router.push('/(auth)/sign-in')}>
          <Text className="text-lg font-bold text-[#6155F5]">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
