import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './onboarding';
import Map from './map';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StatusBar } from 'react-native';
import { useColorScheme } from '../components/useColorScheme';

const Stack = createNativeStackNavigator();

export default function App() {
  // Determine the color scheme of the device
  const colorScheme = useColorScheme();
  return (
    // Wrap the entire app with GestureHandlerRootView for gesture handling
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Hide the status bar */}
      <StatusBar hidden />
      {/* Apply an animated fade-in effect to the entire app */}
      <Animated.View style={{ flex: 1 }} entering={FadeIn}>
        {/* Provide theme context based on the device color scheme */}
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {/* Use a stack navigator for navigation between screens */}
          <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
          </Stack.Navigator>
        </ThemeProvider>
      </Animated.View>
    </GestureHandlerRootView>
  );
}