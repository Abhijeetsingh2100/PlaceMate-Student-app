import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "global.css";

const SignUp = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-6">
            {/* Logo Section */}
            <View className="items-center mt-12">
              <Image
                source={require("../../assets/images/screenlogo.png")}
                className="w-36 h-36"
              />

              <Text className="text-3xl font-bold text-[#3525CD] mt-4">
                Placement Tracker
              </Text>

              <Text className="text-gray-500 mt-2 text-base">
                Start your placement journey today
              </Text>
            </View>

            <View
              className="px-4 py-3 bg-white rounded-2xl mt-8"
              style={{
                elevation: 4,
              }}
            >
              {/* Form */}
              <View className="mt-6">
                <Text className="text-gray-700 font-medium mb-2">
                  Full Name
                </Text>

                <TextInput
                  placeholder="Name"
                  className="border border-gray-300 rounded-xl px-4 py-4 mb-5"
                />

                <Text className="text-gray-700 font-medium mb-2">
                  Email Address
                </Text>

                <TextInput
                  placeholder="student@university.edu"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="border border-gray-300 rounded-xl px-4 py-4 mb-5"
                />

                <Text className="text-gray-700 font-medium mb-2">
                  Password
                </Text>

                <TextInput
                  placeholder="********"
                  secureTextEntry
                  className="border border-gray-300 rounded-xl px-4 py-4 mb-5"
                />

                <Text className="text-gray-700 font-medium mb-2">
                  Confirm Password
                </Text>

                <TextInput
                  placeholder="********"
                  secureTextEntry
                  className="border border-gray-300 rounded-xl px-4 py-4"
                />

                {/* Signup Button */}
                <TouchableOpacity
                  className="bg-[#3525CD] h-14 rounded-xl items-center justify-center mt-8"
                  style={{
                    elevation: 6,
                  }}
                >
                  <Text className="text-white text-lg font-bold">
                    Create Account
                  </Text>
                </TouchableOpacity>

                {/* Divider */}
                <View className="flex-row items-center my-8">
                  <View className="flex-1 h-[1px] bg-gray-300" />

                  <Text className="mx-4 text-gray-400">
                    OR CONTINUE WITH
                  </Text>

                  <View className="flex-1 h-[1px] bg-gray-300" />
                </View>

                {/* Social Buttons */}
                <View className="flex-row justify-between">
                  <TouchableOpacity className="border border-gray-200 rounded-xl h-14 flex-1 items-center justify-center mr-2">
                    <Text>Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="border border-gray-200 rounded-xl h-14 flex-1 items-center justify-center ml-2">
                    <Text>SSO</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center mt-5 mb-10">
              <Text className="text-gray-500">
                Already have an account?
              </Text>

              <TouchableOpacity
              
              >
                <Text className="text-[#6155F5] font-semibold ml-1">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;