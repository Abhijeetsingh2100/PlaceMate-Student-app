import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import 'global.css';

const SignIn = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert('Sign In Failed', 'Please try again.');
      }
    } catch (err: any) {
      Alert.alert('Sign In Error', err.errors?.[0]?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* Logo Section */}
      <View className="mt-12 items-center ">
        <Image source={require('../../assets/images/screenlogo.png')} className="h-36 w-36" />

        <Text className="mt-4 text-3xl font-bold text-[#3525CD]">Placement Tracker</Text>

        <Text className="mt-2 text-base text-gray-500">Elevate your career journey</Text>
      </View>
      <View
        className=" mt-12 rounded-2xl bg-white px-4 py-3"
        style={{
          elevation: 4,
        }}>
        {/* Form */}
        <View className="mt-6">
          <Text className="mb-2 font-medium text-gray-700">Email Address</Text>

          <TextInput
            placeholder="student@university.edu"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            className="mb-5 rounded-xl border border-gray-300 px-4 py-4"
          />

          <View className="mb-2 flex-row justify-between">
            <Text className="font-medium text-gray-700">Password</Text>

            <TouchableOpacity>
              <Text className="font-medium text-[#6155F5]">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="rounded-xl border border-gray-300 px-4 py-4"
          />

          {/* Login Button */}
          <TouchableOpacity
            onPress={onSignInPress}
            disabled={loading}
            className="mt-8 h-14 flex-row items-center justify-center rounded-xl bg-[#3525CD]"
            style={{ elevation: 6 }}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-lg font-bold text-white">Log In</Text>
            )}
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

          {/* Footer */}
        </View>
      </View>
      <View className="mt-10 flex-row justify-center">
        <Text className="text-gray-500">{"Don't have an account?"}</Text>

        <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
          <Text className="ml-1 font-semibold text-[#6155F5]">Create an Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
