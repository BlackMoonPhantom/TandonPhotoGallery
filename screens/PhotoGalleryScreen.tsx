import React, { useState } from 'react';
import { Platform, TextInput, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';

const PhotoGalleryScreen = () => {
  const [imageData] = useState(() => {
    const data = [];
    for (let i = 1; i <= 50; i++) {
      data.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
    }
    return data;
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering images based on search term
  const filteredImageData = imageData.filter((image) =>
    image.id.toString().includes(searchTerm)
  );

  // Shared value for vertical margin and rotation
  const marginVertical = useSharedValue(2);
  const rotation = useSharedValue(0); // For rotation

  // Scroll handler for animations
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const newMargin = 2 + event.contentOffset.y / 30;
      if (newMargin < 2) {
        marginVertical.value = 2;
      } else if (newMargin > 20) {
        marginVertical.value = 20;
      } else {
        marginVertical.value = newMargin;
      }

      // Update rotation value based on scroll
      rotation.value = event.contentOffset.y / 100; // Adjust the factor to control rotation speed
    },
  });

  // Animated style for the thumbnails
  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginVertical: marginVertical.value,
      transform: [
        {
          rotate: `${rotation.value}rad`, // Convert rotation to radians
        },
      ],
    };
  });

  // Handling thumbnail press
  const handleThumbnailPress = (url: string) => {
    console.log(`Thumbnail pressed: ${url}`);
    // Handle navigation to detail screen if needed
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by ID"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Animated.FlatList
        contentContainerStyle={{ alignItems: 'center', paddingTop: 20 }}
        numColumns={3}
        data={filteredImageData}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleThumbnailPress(item.url)}
          >
            <Animated.Image
              sharedTransitionTag={`tag-${item.url}`}
              style={[styles.thumbnail, animatedStyle]} // Apply both animations here
              source={{ uri: item.url }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={({ id }) => id.toString()}
        onScroll={scrollHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  input: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
  },
  thumbnail: {
    margin: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
});

export default PhotoGalleryScreen;
