import { View, Text } from 'react-native'
import React from 'react'
import '../global.css'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView>

    <View className='pt-2  items-center'>
      <Text className='text-2xl text-[#3525CD]'>Placement Tracker</Text>
    </View>
    </SafeAreaView>
  )
}

export default index