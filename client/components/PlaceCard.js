import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import ImageViewer from "react-native-image-zoom-viewer";
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import * as SplashScreen from "expo-splash-screen";
import styles from "./styles";

SplashScreen.preventAutoHideAsync();

const PlaceCard = ({
  singlePlace,
  photos,
  availableVoices,
  selectedVoice,
  setSelectedVoice,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isReading, setIsReading] = useState(false);

  // Load the fonts
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null while fonts are loading
  }

  const handlePress = () => {
    const { lat, lng } = singlePlace.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    if (Platform.OS === "web") {
      window.open(url, "_blank");
    } else {
      Linking.openURL(url);
    }
  };

  const handleImagePress = (photo) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPhoto(null);
  };

  const handleToggleReading = () => {
    if (isReading) {
      // Stop reading summary
      // ...existing code to stop reading...
    } else {
      // Start reading summary
      // ...existing code to start reading...
    }
    setIsReading(!isReading);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titleStyle}>SpotWise</Text>
        <Text style={styles.placeNameStyle}>
          Place Name: {singlePlace.displayName}
        </Text>

        <View style={styles.imageContainer}>
          {photos &&
            photos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(photo)}
              >
                <Image source={{ uri: photo }} style={styles.image} />
              </TouchableOpacity>
            ))}

          <TouchableOpacity style={styles.buttonMaps} onPress={handlePress}>
            <MaterialIcons name="place" size={40} color="white" />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.descriptionStyle}>Description</Text>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>{singlePlace.summary}</Text>
        </View>

        {/* picker para seleccionar la voz */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedVoice}
            onValueChange={(itemValue) => setSelectedVoice(itemValue)}
            style={styles.picker}
          >
            {availableVoices.map((voice) => (
              <Picker.Item
                key={voice.identifier}
                label={voice.name}
                value={voice.identifier}
              />
            ))}
          </Picker>
        </View>

        {/* Button to toggle reading summary */}
        <View style={styles.containerB}>
          <TouchableOpacity
            style={[
              styles.roundButton,
              isReading ? styles.pauseButton : styles.playButton,
            ]}
            onPress={handleToggleReading}
          >
            <MaterialIcons
              name={isReading ? "stop" : "play-arrow"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal para mostrar la imagen en pantalla completa */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseModal}
          >
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
          {selectedPhoto && (
            <ImageViewer
              imageUrls={[{ url: selectedPhoto }]}
              enableSwipeDown={true}
              onSwipeDown={handleCloseModal}
              renderIndicator={() => null}
            />
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PlaceCard;
