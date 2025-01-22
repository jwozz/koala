import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen'; // For managing the splash screen
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

import HomeNav from './HomeNav'; // Import the HomeNav component
import Talks from './Talks';
import Circles from './Circles';
import Market from './Market';
import Alerts from './Alerts';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible until fonts are loaded

export default function App() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold, 
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded

  const screenOptions = {
    animationEnabled: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Talks" screenOptions={screenOptions}>
        <Stack.Screen name="Talks" component={Talks} options={{ headerShown: false }} />
        <Stack.Screen name="Circles" component={Circles} options={{ headerShown: false }} />
        <Stack.Screen name="Market" component={Market} options={{ headerShown: false }} />
        <Stack.Screen name="Alerts" component={Alerts} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
