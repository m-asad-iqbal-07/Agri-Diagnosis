import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
    activeOpacity={0.8} // Adds a slight opacity effect when button is pressed
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const UploadUrdu = () => {
  const navigation = useNavigation();

  const handleTakePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "اجازت نہیں ملی",
        "تصویر لینے کے لیے کیمرہ رسائی کی اجازت ضروری ہے۔"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      // Navigate to the DiagnosisReportUrdu screen with the image URI
      navigation.navigate("DiagnosisReportUrdu", {
        uploadedImage: result.assets[0].uri,
      });
    }
  };

  const handleUploadPicture = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "اجازت نہیں ملی",
        "تصویر منتخب کرنے کے لیے گیلری رسائی کی اجازت ضروری ہے۔"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      // Navigate to the DiagnosisReportUrdu screen with the image URI
      navigation.navigate("DiagnosisReportUrdu", {
        uploadedImage: result.assets[0].uri,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        accessibilityLabel="واپس جائیں"
      >
        <Icon name="arrow-back" size={30} color="#45762d" />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("../assets/applogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Upload Icon */}
      <Image
        source={require("../assets/up.png")}
        style={styles.icon}
        resizeMode="contain"
      />

      {/* Instruction Text */}
      <Text style={styles.instruction}>
        <Text style={styles.highlight}> اپنی فصل کی تصویر </Text>
        اپ لوڈ کریں تاکہ بیماریوں کی شناخت کریں اور فوری طور پر حسب ضرورت حل حاصل کریں۔
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton title="تصویر لیں 📸" onPress={handleTakePicture} />
        <CustomButton title="تصویر اپ لوڈ کریں ⬆️" onPress={handleUploadPicture} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  icon: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  instruction: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "#444",
  },
  highlight: {
    color: "#45762d",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#45762d", // Replace gradient with a solid color
    borderRadius: 30,
    marginVertical: 10,
    width: "80%",
    paddingVertical: 15,
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UploadUrdu;
