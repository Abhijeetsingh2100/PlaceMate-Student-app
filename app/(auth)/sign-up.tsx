import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'global.css';

const SignUp = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="px-6">
            {/* Logo Section */}
            <View className="mt-12 items-center">
              <Image source={require('../../assets/images/screenlogo.png')} className="h-36 w-36" />

              <Text className="mt-4 text-3xl font-bold text-[#3525CD]">Placement Tracker</Text>

              <Text className="mt-2 text-base text-gray-500">
                Start your placement journey today
              </Text>
            </View>

            <View
              className="mt-8 rounded-2xl bg-white px-4 py-3"
              style={{
                elevation: 4,
              }}>
              {/* Form */}
              <View className="mt-6">
                <Text className="mb-2 font-medium text-gray-700">Full Name</Text>

                <TextInput
                  placeholder="Name"
                  className="mb-5 rounded-xl border border-gray-300 px-4 py-4"
                />

                <Text className="mb-2 font-medium text-gray-700">Email Address</Text>

                <TextInput
                  placeholder="student@university.edu"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="mb-5 rounded-xl border border-gray-300 px-4 py-4"
                />

                <Text className="mb-2 font-medium text-gray-700">Password</Text>

                <TextInput
                  placeholder="********"
                  secureTextEntry
                  className="mb-5 rounded-xl border border-gray-300 px-4 py-4"
                />

                <Text className="mb-2 font-medium text-gray-700">Confirm Password</Text>

                <TextInput
                  placeholder="********"
                  secureTextEntry
                  className="rounded-xl border border-gray-300 px-4 py-4"
                />

                {/* Signup Button */}
                <TouchableOpacity
                  className="mt-8 h-14 items-center justify-center rounded-xl bg-[#3525CD]"
                  style={{
                    elevation: 6,
                  }}>
                  <Text className="text-lg font-bold text-white">Create Account</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View className="my-8 flex-row items-center">
                  <View className="h-[1px] flex-1 bg-gray-300" />

                  <Text className="mx-4 text-gray-400">OR CONTINUE WITH</Text>

                  <View className="h-[1px] flex-1 bg-gray-300" />
                </View>

                {/* Social Buttons */}
                <View className="flex-row justify-between">
                  <TouchableOpacity className="mr-2 h-14 flex-1 items-center justify-center rounded-xl border border-gray-200">
                    <Text>Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="ml-2 h-14 flex-1 items-center justify-center rounded-xl border border-gray-200">
                    <Text>SSO</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Footer */}
            <View className="mb-10 mt-5 flex-row justify-center">
              <Text className="text-gray-500">Already have an account?</Text>

              <TouchableOpacity>
                <Text className="ml-1 font-semibold text-[#6155F5]">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
