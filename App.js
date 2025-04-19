import React, { useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './screens/welcome';
import UploadEnglish from './screens/uploadEnglish';
import UploadUrdu from './screens/uploadUrdu';
import LangSelect from './screens/langSelect';
import DiagnosisReportUrdu from './screens/DiagnosisReportUrdu';
import DiagnosisReportEnglish from './screens/DiagnosisReportEnglish';

// Prevent splash screen from hiding immediately
SplashScreen.preventAutoHideAsync()
  .catch(err => console.warn('SplashScreen Error:', err));

const Stack = createStackNavigator(); // Define Stack Navigator

const App = () => {
  useEffect(() => {
    const hideSplash = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
      await SplashScreen.hideAsync(); // Hide splash screen
    };
    hideSplash();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="LangSelect" component={LangSelect} />
             <Stack.Screen name="UploadEnglish" component={UploadEnglish} />
             <Stack.Screen name="UploadUrdu" component={UploadUrdu} />
             <Stack.Screen name="DiagnosisReportUrdu" component={DiagnosisReportUrdu} />
             <Stack.Screen name="DiagnosisReportEnglish" component={DiagnosisReportEnglish} />

                  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

