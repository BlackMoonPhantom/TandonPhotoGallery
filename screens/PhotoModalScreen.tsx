import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'PhotoModal'>;

const PhotoModalScreen: React.FC<Props> = ({ route, navigation }) => {
  const { url } = route.params;

  return (
    <View style={styles.modalContainer}>
      <Image source={{ uri: url }} style={styles.fullScreenImage} />
      <View style={styles.buttonContainer}>
        <Button title="Close" onPress={() => navigation.goBack()} color="#0000FF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonContainer: {
    position: 'absolute',
    bottom: 93, // Position the button near the bottom of the screen
    alignSelf: 'center', // Center the button horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly transparent background for the button area
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default PhotoModalScreen;





