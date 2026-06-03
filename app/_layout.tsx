import { Stack, useSegments, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { ApplicationsProvider } from '../context/ApplicationsContext';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      return item;
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const isPublicRoute = segments[0] === '(auth)' || segments[0] === 'onboarding' || !segments[0];
    
    if (isSignedIn && isPublicRoute) {
      router.replace('/(tabs)/dashboard');
    } else if (!isSignedIn && !isPublicRoute) {
      router.replace('/onboarding');
    }

    // Hide splash screen once routing is determined
    SplashScreen.hideAsync();
  }, [isSignedIn, isLoaded, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ApplicationsProvider>
          <StatusBar style="auto" />
          <InitialLayout />
        </ApplicationsProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
