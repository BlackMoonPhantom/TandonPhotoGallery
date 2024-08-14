import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native';

interface ImageData {
  id: number;
  url: string;
}

const App = () => {
  const [imageData] = useState<ImageData[]>(() => {
    const data: ImageData[] = [];
    for (let i = 1; i < 70; i++) {
      data.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
    }
    return data;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

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
          <TouchableOpacity onPress={() => setSelectedImage(item)}>
            <Image source={{ uri: item.url }} style={styles.imageThumbnail} />
          </TouchableOpacity>
        )}
      />
      {selectedImage && (
        <Modal
          transparent={true}
          visible={true}
          onRequestClose={() => setSelectedImage(null)}
        >
          <TouchableOpacity style={styles.modalContainer} onPress={() => setSelectedImage(null)}>
            <Image source={{ uri: selectedImage.url }} style={styles.fullScreenImage} />
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    alignItems: 'center', // Center content horizontally
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    width: '90%', // Adjust the width to make it look centered
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },
  flatListContainer: {
    justifyContent: 'center', // Center the grid items
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
