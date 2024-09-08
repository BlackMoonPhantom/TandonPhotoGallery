import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PhotoGalleryScreen from './screens/PhotoGalleryScreen';
import PhotoDetailScreen from './screens/PhotoDetailScreen'; // Import the PhotoDetail screen
import PhotoModalScreen from './screens/PhotoModalScreen'; // Import the PhotoModal screen
import WeatherAppScreen from './screens/WeatherAppScreen'; // Placeholder for the Weather app

export type RootStackParamList = {
  PhotoGallery: undefined;
  PhotoDetail: { id: number; url: string };
  PhotoModal: { url: string };
  WeatherApp: undefined;
};

// Create the Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Main stack for Photo Gallery, including PhotoDetail and PhotoModal
const PhotoGalleryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PhotoGallery" component={PhotoGalleryScreen} options={{ title: 'Photo Gallery' }} />
      <Stack.Screen name="PhotoDetail" component={PhotoDetailScreen} options={({ route }) => ({ title: route.params.url })} />
      <Stack.Screen name="PhotoModal" component={PhotoModalScreen} options={{ presentation: 'modal', headerShown: false }} />
    </Stack.Navigator>
  );
};

// Placeholder stack for Weather App
const WeatherAppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WeatherApp" component={WeatherAppScreen} options={{ title: 'Weather App' }} />
    </Stack.Navigator>
  );
};

// Create the Drawer Navigator
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          swipeEnabled: true, // Enable swipe gesture
          drawerPosition: 'right', // Set drawer to open from the right
          headerShown: false, // Hide the header
        }}
      >
        <Drawer.Screen name="Photo Gallery" component={PhotoGalleryStack} />
        <Drawer.Screen name="Weather App" component={WeatherAppStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

