import React, { useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';

interface ImageData {
  id: number;
  url: string;
}

const PhotoGalleryScreen: React.FC = () => {
  const [imageData] = useState<ImageData[]>(() => {
    const data: ImageData[] = [];
    for (let i = 1; i < 70; i++) {
      data.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
    }
    return data;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const filteredImages = imageData.filter(image => image.id.toString().includes(searchTerm));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by ID"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredImages}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PhotoDetail', { id: item.id, url: item.url })}>
            <Image source={{ uri: item.url }} style={styles.imageThumbnail} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    width: '90%',
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default PhotoGalleryScreen;

