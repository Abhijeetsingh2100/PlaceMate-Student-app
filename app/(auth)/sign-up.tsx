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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import 'global.css';

const SignUp = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = (pass: string) => {
    const hasNumber = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const hasValidLength = pass.length >= 8 && pass.length <= 16;
    
    if (!hasValidLength) return 'Password must be 8-16 characters long.';
    if (!hasNumber) return 'Password must contain at least one number.';
    if (!hasSpecialChar) return 'Password must contain at least one special character.';
    return null;
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    const passError = validatePassword(password);
    if (passError) {
      Alert.alert('Error', passError);
      return;
    }
    setLoading(true);
    try {
      const names = fullName.trim().split(' ');
      const firstName = names[0] || '';
      const lastName = names.length > 1 ? names.slice(1).join(' ') : '';

      await signUp.create({
        emailAddress: email,
        password,
      });
      
      try {
        if (firstName || lastName) {
          await signUp.update({
            firstName,
            lastName,
          });
        }
      } catch (e) {
        console.warn('Name fields might not be enabled in Clerk Dashboard', e);
      }

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert('Sign Up Error', err.errors?.[0]?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
      } else {
        Alert.alert('Verification Failed', 'Could not complete verification.');
      }
    } catch (err: any) {
      Alert.alert('Verification Error', err.errors?.[0]?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView className="flex-1 bg-white px-6">
        <View className="mt-20 items-center">
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-[#E8E6FF]">
            <Ionicons name="mail-open-outline" size={48} color="#3525CD" />
          </View>
          <Text className="w-full text-center text-3xl font-bold text-[#3525CD]">Verify Email</Text>
          <Text className="mt-4 w-full text-center text-base text-gray-500">
            We've sent a 6-digit code to{'\n'}
            <Text className="font-bold text-gray-800">{email}</Text>
          </Text>
        </View>
        <View className="mt-12">
          <Text className="mb-2 text-center font-medium text-gray-700">Enter Verification Code</Text>
          <TextInput
            placeholder="000000"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
            className="rounded-xl border border-gray-300 px-4 py-4 text-center text-2xl tracking-[10px]"
          />
          <TouchableOpacity
            onPress={onPressVerify}
            disabled={loading}
            className="mt-8 h-14 w-full flex-row items-center justify-center rounded-xl bg-[#3525CD]"
            style={{ elevation: 6 }}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-center text-lg font-bold text-white">Verify Account</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
                  value={fullName}
                  onChangeText={setFullName}
                  className="mb-5 rounded-xl border border-gray-300 px-4 py-4"
                />

                <Text className="mb-2 font-medium text-gray-700">Email Address</Text>

                <TextInput
                  placeholder="student@university.edu"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  className="mb-5 rounded-xl border border-gray-300 px-4 py-4"
                />

                <Text className="mb-2 font-medium text-gray-700">Password</Text>

                <View className="mb-2 flex-row items-center rounded-xl border border-gray-300 px-4 py-1">
                  <TextInput
                    placeholder="********"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    className="flex-1 py-3"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-2">
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                  </TouchableOpacity>
                </View>

                {/* Password Requirements Indicator */}
                <View className="mb-5 ml-1">
                  <Text className={`text-xs ${password.length >= 8 && password.length <= 16 ? 'text-green-600' : 'text-gray-500'}`}>
                    {password.length >= 8 && password.length <= 16 ? '✓ ' : '• '}8-16 characters
                  </Text>
                  <Text className={`text-xs ${/\d/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    {/\d/.test(password) ? '✓ ' : '• '}At least 1 number
                  </Text>
                  <Text className={`text-xs ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '✓ ' : '• '}At least 1 special character
                  </Text>
                </View>

                <Text className="mb-2 font-medium text-gray-700">Confirm Password</Text>

                <View className="mb-5 flex-row items-center rounded-xl border border-gray-300 px-4 py-1">
                  <TextInput
                    placeholder="********"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    className="flex-1 py-3"
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="p-2">
                    <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                  </TouchableOpacity>
                </View>

                {/* Signup Button */}
                <TouchableOpacity
                  onPress={onSignUpPress}
                  disabled={loading}
                  className="mt-8 h-14 flex-row items-center justify-center rounded-xl bg-[#3525CD]"
                  style={{ elevation: 6 }}>
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-lg font-bold text-white">Create Account</Text>
                  )}
                </TouchableOpacity>

                {/* Divider */}
                {/* <View className="my-8 flex-row items-center">
                  <View className="h-[1px] flex-1 bg-gray-300" />

                  <Text className="mx-4 text-gray-400">OR CONTINUE WITH</Text>

                  <View className="h-[1px] flex-1 bg-gray-300" />
                </View> */}

                {/* Social Buttons */}
                {/* <View className="flex-row justify-between">
                  <TouchableOpacity className="mr-2 h-14 flex-1 items-center justify-center rounded-xl border border-gray-200">
                    <Text>Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="ml-2 h-14 flex-1 items-center justify-center rounded-xl border border-gray-200">
                    <Text>SSO</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </View>

            {/* Footer */}
            <View className="mb-10 mt-5 flex-row justify-center">
              <Text className="text-gray-500">Already have an account?</Text>

              <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
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
