import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'PhotoDetail'>;

const PhotoDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: url }} style={styles.fullScreenImage} />
      <Button title="View Fullscreen" onPress={() => navigation.navigate('PhotoModal', { url })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  fullScreenImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default PhotoDetailScreen;


