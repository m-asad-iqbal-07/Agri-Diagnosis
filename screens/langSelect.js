import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


const LangSelect = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [headingText, setHeadingText] = useState('Please, select your language!');
  const [nextButtonText, setNextButtonText] = useState('Next');
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedLanguage === 'English') {
      setHeadingText('Please, select your language!');
      setNextButtonText('Next');
    } else if (selectedLanguage === 'Urdu') {
      setHeadingText('براہ کرم اپنی زبان منتخب کریں!');
      setNextButtonText('آگے');
    }
  }, [selectedLanguage]);

  const handleNext = () => {
    if (!selectedLanguage) {
      Alert.alert(
        'Selection Required', // Alert title
        'Please select a language before proceeding.', // Alert message
        [
          {
            text: 'OK', // Button text
            onPress: () => console.log('OK Pressed'), // Optional action
          },
        ]
      );
      return;
    }
  
    navigation.navigate(
      selectedLanguage === 'English' ? 'UploadEnglish' : 'UploadUrdu'
    );
  };
  

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="#45762d" />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../assets/applogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Language Selection */}
      <View style={styles.card}>
        <Text style={styles.instruction}>{headingText}</Text>

        {/* Language Options */}
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => setSelectedLanguage('English')}
        >
          <View
            style={[
              styles.radioButton,
              selectedLanguage === 'English' && styles.radioSelected,
            ]}
          />
          <Text style={styles.optionText}>English</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => setSelectedLanguage('Urdu')}
        >
          <View
            style={[
              styles.radioButton,
              selectedLanguage === 'Urdu' && styles.radioSelected,
            ]}
          />
          <Text style={styles.optionText}>اردو</Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{nextButtonText}</Text>
        </TouchableOpacity>
      </View>

      {/* Toast Message */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logo: {
    width: 400,
    height: 200,
    marginVertical: 50,
  },
  card: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    padding: 30,
    elevation: 25,
    marginTop: 20,
  },
  instruction: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#45762d',
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: '#45762d',
  },
  optionText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#45762d',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LangSelect;
