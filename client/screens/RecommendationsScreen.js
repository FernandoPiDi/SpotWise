import React, { useState, useEffect } from "react";
import { View, FlatList, Platform, StatusBar } from "react-native";
import PlaceCard from "../components/PlaceCard";
import BottomBar from "../components/BottomBar";
import * as Speech from "expo-speech";

const RecommendationsScreen = () => {
  const [places, setPlaces] = useState([]);
  const [availableVoices, setAvailableVoices] = useState([]); // Define the state for available voices
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/recommendations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lat: 52.516274574455444,
              lng: 13.37776842524685,
            }),
            // body: JSON.stringify({
            //   lat: 52.509332,
            //   lng: 13.376739,
            // }),
          }
        );
        const data = await response.json();
        console.log("Datos obtenidos:", data); // imprime el json de respuesta en la consola que proviene del backend
        setPlaces([data]);
      } catch (error) {
        console.error("Error al obtener las recomendaciones:", error);
      }
    };

    const fetchVoices = async () => {
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        // console.log("voces disponibles:", voices); // imprime todas las voces disponibles en la consola
        if (voices.length === 0) {
          console.warn("No se encontraron voces disponibles.");
        }
        const englishVoices = voices
          .filter((voice) => voice.language.startsWith("en"))
          .slice(0, 10); // Limit to the first 10 voices
        console.log("voces disponibles en inglés:", englishVoices); // imprime solo las voces disponibles en inglés en la consola
        setAvailableVoices(englishVoices);

        // seleccionar una voz masculina o femenina si están disponibles
        const defaultVoice = englishVoices.find(
          (voice) => voice.language === "en-US"
        );
        setSelectedVoice(defaultVoice?.identifier || "");
      } catch (error) {
        console.error("Error al obtener las voces:", error);
      }
    };

    fetchRecommendations();
    fetchVoices();
  }, []);

  const handleToggleReading = () => {
    const summaryText = places[0]?.summary;
    if (isReading) {
      // Stop reading summary
      if (Platform.OS === "web") {
        window.speechSynthesis.cancel();
      } else {
        Speech.stop();
      }
      setIsReading(false);
    } else {
      // Start reading summary
      if (summaryText) {
        if (Platform.OS === "web") {
          const utterance = new window.SpeechSynthesisUtterance(summaryText);
          utterance.lang = "en-US";
          //utterance.onend = () => setIsReading(false); // Reset button state when reading is finished
          window.speechSynthesis.speak(utterance);
        } else {
          const options = {
            language: "en",
            onDone: () => setIsReading(false), // Reset button state when reading is finished
          };
          if (selectedVoice) {
            options.voice = selectedVoice;
          }
          Speech.speak(summaryText, options);
        }
        setIsReading(true);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <FlatList
        data={places}
        keyExtractor={(item) => item.displayName}
        renderItem={({ item }) => (
          <PlaceCard
            singlePlace={item}
            photos={item.photos.map(
              (photo) =>
                `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
            )}
            availableVoices={availableVoices}
            selectedVoice={selectedVoice}
            setSelectedVoice={setSelectedVoice}
          />
        )}
      />
      <BottomBar onToggleReading={handleToggleReading} isReading={isReading} />
    </View>
  );
};

export default RecommendationsScreen;
