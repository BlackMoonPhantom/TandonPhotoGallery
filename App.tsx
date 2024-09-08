import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; // For forecast tabs
import PhotoGalleryScreen from './screens/PhotoGalleryScreen';
import PhotoDetailScreen from './screens/PhotoDetailScreen'; // Import the PhotoDetail screen
import PhotoModalScreen from './screens/PhotoModalScreen'; // Import the PhotoModal screen
import CurrentWeatherScreen from './screens/CurrentWeatherScreen'; // For current weather
import ForecastScreen from './screens/ForecastScreen'; // For forecast tabs

export type RootStackParamList = {
  PhotoGallery: undefined;
  PhotoDetail: { id: number; url: string };
  PhotoModal: { url: string };
  WeatherApp: undefined;
  CurrentWeather: undefined;
  Forecast: undefined;
  ForecastTab: { days: number };
};

// Create the Stack Navigator for Photo Gallery
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

// Create the Forecast Tab Navigator
const ForecastTabNavigator = createMaterialTopTabNavigator();

const ForecastTabs = () => {
  return (
    <ForecastTabNavigator.Navigator>
      <ForecastTabNavigator.Screen name="Forecast-3Day" component={ForecastScreen} initialParams={{ days: 3 }} />
      <ForecastTabNavigator.Screen name="Forecast-5Day" component={ForecastScreen} initialParams={{ days: 5 }} />
    </ForecastTabNavigator.Navigator>
  );
};

// Create the Drawer Navigator for Weather App
const WeatherAppDrawer = createDrawerNavigator();

const WeatherAppStack = () => {
  return (
    <WeatherAppDrawer.Navigator
      screenOptions={{
        drawerPosition: 'left', // Set the drawer to open from the left
      }}
    >
      <WeatherAppDrawer.Screen name="Current Weather" component={CurrentWeatherScreen} />
      <WeatherAppDrawer.Screen name="Forecast" component={ForecastTabs} />
    </WeatherAppDrawer.Navigator>
  );
};

// Create the Main Drawer Navigator
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


