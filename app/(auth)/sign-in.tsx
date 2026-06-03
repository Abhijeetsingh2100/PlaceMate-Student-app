import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import 'global.css';

const SignIn = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password State
  const [isForgotModalVisible, setForgotModalVisible] = useState(false);
  const [forgotStep, setForgotStep] = useState<'email' | 'otp'>('email');
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

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
  const handleSendResetCode = async () => {
    if (!resetEmail) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    setResetLoading(true);
    try {
      await signIn!.create({
        strategy: 'reset_password_email_code',
        identifier: resetEmail,
      });
      setForgotStep('otp');
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Failed to send code. Ensure the email is registered.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetCode || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setResetLoading(true);
    try {
      const attempt = await signIn!.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: resetCode,
        password: newPassword,
      });

      if (attempt.status === 'complete') {
        await setActive({ session: attempt.createdSessionId });
        setForgotModalVisible(false);
        Alert.alert('Success', 'Password reset successfully!');
      } else {
        console.error(attempt);
        Alert.alert('Error', 'Reset failed. Try again.');
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Invalid code or password requirements not met.');
    } finally {
      setResetLoading(false);
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

            <TouchableOpacity onPress={() => {
              setForgotStep('email');
              setResetEmail(email); // Pre-fill if they already typed it
              setResetCode('');
              setNewPassword('');
              setConfirmPassword('');
              setForgotModalVisible(true);
            }}>
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
          

          {/* Footer */}
        </View>
      </View>
      <View className="mt-10 flex-row justify-center">
        <Text className="text-gray-500">{"Don't have an account?"}</Text>

        <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
          <Text className="ml-1 font-semibold text-[#6155F5]">Create an Account</Text>
        </TouchableOpacity>
      </View>

      {/* Forgot Password Modal */}
      <Modal visible={isForgotModalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="rounded-t-3xl bg-white p-6 pb-10">
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-gray-800">Reset Password</Text>
              <TouchableOpacity onPress={() => setForgotModalVisible(false)} className="rounded-full bg-gray-100 p-2">
                <Ionicons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            {forgotStep === 'email' ? (
              <>
                <Text className="mb-4 text-base text-gray-500">
                  Enter your email address and we will send you a 6-digit verification code.
                </Text>
                <Text className="mb-2 font-medium text-gray-700">Email Address</Text>
                <TextInput
                  value={resetEmail}
                  onChangeText={setResetEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="mb-8 rounded-xl border border-gray-300 px-4 py-4"
                  placeholder="student@university.edu"
                />
                <TouchableOpacity
                  onPress={handleSendResetCode}
                  disabled={resetLoading}
                  className="h-14 items-center justify-center rounded-xl bg-[#3525CD]"
                  style={{ elevation: 2 }}>
                  {resetLoading ? <ActivityIndicator color="white" /> : <Text className="text-lg font-bold text-white">Send Code</Text>}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text className="mb-4 text-base text-gray-500">
                  A verification code has been sent to <Text className="font-bold">{resetEmail}</Text>.
                </Text>
                
                <Text className="mb-2 font-medium text-gray-700">Verification Code</Text>
                <TextInput
                  value={resetCode}
                  onChangeText={setResetCode}
                  keyboardType="number-pad"
                  className="mb-4 rounded-xl border border-gray-300 px-4 py-4"
                  placeholder="123456"
                />

                <Text className="mb-2 font-medium text-gray-700">New Password</Text>
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  className="mb-4 rounded-xl border border-gray-300 px-4 py-4"
                  placeholder="********"
                />

                <Text className="mb-2 font-medium text-gray-700">Confirm New Password</Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  className="mb-8 rounded-xl border border-gray-300 px-4 py-4"
                  placeholder="********"
                />

                <TouchableOpacity
                  onPress={handleResetPassword}
                  disabled={resetLoading}
                  className="h-14 items-center justify-center rounded-xl bg-[#3525CD]"
                  style={{ elevation: 2 }}>
                  {resetLoading ? <ActivityIndicator color="white" /> : <Text className="text-lg font-bold text-white">Reset Password & Login</Text>}
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignIn;
