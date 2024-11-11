import React, { useState, useEffect } from "react";
import { View, FlatList, Platform } from "react-native";
import PlaceCard from "../components/PlaceCard";
import BottomBar from "../components/BottomBar";
import * as Speech from "expo-speech";

const RecommendationsScreen = () => {
  const [places, setPlaces] = useState([]);
  const [availableVoices, setAvailableVoices] = useState([]); // Define the state for available voices
  const [selectedVoice, setSelectedVoice] = useState("");

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
            body: JSON.stringify({ lat: 7.137598, lng: -73.118782 }),
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
        const englishVoices = voices.filter((voice) =>
          voice.language.startsWith("en")
        );
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

  const handleReadSummary = () => {
    const summaryText = places[0]?.summary;
    if (summaryText) {
      if (Platform.OS === "web") {
        const utterance = new window.SpeechSynthesisUtterance(summaryText);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
      } else {
        if (selectedVoice) {
          Speech.speak(summaryText, {
            language: "en",
            voice: selectedVoice,
          });
        } else {
          // Usar voz predeterminada si no hay una voz seleccionada
          Speech.speak(summaryText, {
            language: "en",
          });
        }
      }
    }
  };

  const handleStopReading = () => {
    if (Platform.OS === "web") {
      window.speechSynthesis.cancel();
    } else {
      Speech.stop();
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
      <BottomBar
        onReadSummary={handleReadSummary}
        onStopReading={handleStopReading}
      />
    </View>
  );
};

export default RecommendationsScreen;
