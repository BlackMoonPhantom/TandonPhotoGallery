import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhotoGalleryScreen from './screens/PhotoGalleryScreen';
import PhotoDetailScreen from './screens/PhotoDetailScreen';
import PhotoModalScreen from './screens/PhotoModalScreen';

export type RootStackParamList = {
  PhotoGallery: undefined;
  PhotoDetail: { id: number; url: string };
  PhotoModal: { url: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PhotoGallery" component={PhotoGalleryScreen} options={{ title: 'Photo Gallery' }} />
        <Stack.Screen
          name="PhotoDetail"
          component={PhotoDetailScreen}
          options={({ route }) => ({
            title: route.params.url,
            headerShown: true, // Ensure header is shown
          })}
        />
        <Stack.Screen
          name="PhotoModal"
          component={PhotoModalScreen}
          options={{
            presentation: 'modal',
            headerShown: true, // Ensure header is shown
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerTitleStyle: { color: 'black' },
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
