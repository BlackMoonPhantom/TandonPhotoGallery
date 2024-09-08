import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useFetchWeather } from '../hooks/useFetchWeather';

const CurrentWeatherScreen: React.FC = () => {
  const { weatherData, loading } = useFetchWeather('New York');

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!weatherData) {
    return <Text>Error loading weather data</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{weatherData.location.name}</Text>
      <Text>{weatherData.current.condition.text}</Text>
      <Image source={{ uri: `https:${weatherData.current.condition.icon}` }} style={styles.icon} />
      <Text>{weatherData.current.temp_c}°C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    width: 100,
    height: 100,
  },
});

export default CurrentWeatherScreen;
