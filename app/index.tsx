import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";

import '../global.css'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
   const router = useRouter();
  return (
    <SafeAreaView>

    <View className='pt-5  items-center'>
      <Text className='text-2xl text-[#6155F5] font-bold'>Placement Tracker</Text>
    </View>
    <View className=' items-center pt-20'>
      <Image
  source={require("../assets/images/image1.png")}
  style={{
    width:  350,
    height: 328,
  }}
/>
    </View>


  <View className='items-center pt-20'>
    <Text className='text-3xl font-inter font-bold'>
      Master Your Placement 
    </Text>
    <Text className='text-3xl font-inter font-bold'>
      Journey
    </Text>
    <Text className='pt-7 font-inter '>
      Track applications, schedule interviews,
    </Text>
    <Text className='font-inter'>
      and boost your preparation in one place.
    </Text>

  </View>
  <View className='px-5 pt-4'>

 <TouchableOpacity
  className="bg-[#6155F5] h-14 rounded-xl mt-8 justify-center items-center shadow-xl "
  onPress={() => {
    console.log("Button Pressed");
  }}
>
  <Text className="text-white font-bold text-lg">
    Get Started
  </Text>
</TouchableOpacity>
  </View>
  <View className='px-5 '>

  <TouchableOpacity
          className="border border-[#6155F5] h-14 rounded-xl mt-4 items-center justify-center"
          onPress={() => router.push("/(auth)/sign-in")
            
          }
        >
          <Text className="text-[#6155F5] font-bold text-lg">
            Login
          </Text>
        </TouchableOpacity>
  </View>
    </SafeAreaView>
  )
}

export default index