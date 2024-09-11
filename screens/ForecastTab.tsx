import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFetchWeather } from '../hooks/useFetchWeather';

const ForecastTab: React.FC = () => {
  const route = useRoute();
  const { days } = route.params as { days: number };
  const { weatherData, loading } = useFetchWeather('New York', days);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!weatherData) {
    return <Text>Error loading forecast data</Text>;
  }

  return (
    <FlatList
      data={weatherData.forecast.forecastday}
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text>{item.date}</Text>
          <Text>{item.day.condition.text}</Text>
          <Image source={{ uri: `https:${item.day.condition.icon}` }} style={styles.icon} />
          <Text>{item.day.avgtemp_c}°C</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default ForecastTab;


