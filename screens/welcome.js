import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Welcome = ({ navigation }) => {
  const [backendMessage, setBackendMessage] = useState(null); // State to store backend message
  const [error, setError] = useState(null); // State to store error message
  const [successMessage, setSuccessMessage] = useState(null); // State for success message

  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const response = await fetch('http://192.168.100.3:8081'); // Replace with your backend URL
        console.log('Response Status:', response.status); // Log the status code
        console.log('Response:', response); // Log the whole response

        if (!response.ok) {
          throw new Error('Failed to connect to backend');
        }

        const data = await response.json();
        console.log('Backend Data:', data); // Log the data to ensure it's received properly
        setBackendMessage(data.message); // Set the backend data
        setSuccessMessage('Hello from backend!'); // Set success message

        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
      } catch (err) {
        console.error('Error fetching backend data:', err);
        setError('Failed to fetch backend data'); // Set error message if the fetch fails
      }
    };

    fetchBackendData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <View style={styles.welcomeContainer}>
      <Image
        source={require('../assets/applogo.png')} // Replace with your actual logo
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to the AGRI Diagnosis!</Text>
      <Text style={styles.subtitle}> "From Field to Market, Your Agri-Disease Solution!" </Text>

      {/* Show the backend message if it's fetched successfully */}
      {backendMessage && <Text style={styles.backendMessage}>{backendMessage}</Text>}
      
      {/* Show success message if backend is successfully connected */}
      {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}

      {/* Show error message if there's an issue with the backend connection */}
      {error && <Text style={styles.errorMessage}>{error}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LangSelect')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 350,
    resizeMode: 'contain',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginHorizontal: 25,
    marginTop: 10,
  },
  backendMessage: {
    fontSize: 18,
    color: '#45762d',
    marginTop: 20,
  },
  successMessage: {
    fontSize: 18,
    color: '#28a745',
    marginTop: 20,
  },
  errorMessage: {
    fontSize: 18,
    color: '#ff0000',
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#45762d',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Welcome;
