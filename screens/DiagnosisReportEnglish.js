import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const DiagnosisReportEnglish = ({ navigation }) => {
  const route = useRoute();
  const { uploadedImage } = route.params || {};
  const [image, setImage] = useState(uploadedImage);

  // Function to open the image picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the selected image URI
    }
  };

  // Function to allow the user to change the image
  const changeImage = () => {
    pickImage(); // Open the image picker again to select a new image
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Diagnosis Report</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Result Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionNumber}>1. </Text>
            Result
          </Text>
          <View style={styles.resultCard}>
            <Text style={styles.errorText}>Oh no!</Text>
            <Text style={styles.resultDescription}>Your plant is damaged.</Text>
            {image ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
                <TouchableOpacity style={styles.changeImageButton} onPress={changeImage}>
                  <Text style={styles.changeImageText}>Change Image</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.placeholderContainer} onPress={pickImage}>
                <Icon name="image-outline" size={50} color="#ccc" />
                <Text style={styles.placeholderText}>Select an image</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Diseases Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.sectionNumber}>2. </Text>
            Diseases
          </Text>
          <View style={styles.diseaseCard}>
            <Text style={styles.diseaseText}>Include disease details here.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#45762d',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 4,
    marginBottom: 0,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#45762d',
    marginBottom: 10,
    textAlign: 'left',
  },
  sectionNumber: {
    fontSize: 22,
    color: '#000',
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultDescription: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f0f0f0', // A neutral background to make the image stand out
  },
  changeImageButton: {
    backgroundColor: '#45762d',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  changeImageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
  diseaseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    alignItems: 'center',
    justifyContent: 'center',
  },
  diseaseText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

export default DiagnosisReportEnglish;
