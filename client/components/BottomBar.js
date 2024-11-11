import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

const BottomBar = ({ onReadSummary, onStopReading }) => {
  return (
    <View style={styles.containerB}>
      <TouchableOpacity
        style={[styles.roundButton, styles.playButton]}
        onPress={onReadSummary}
      >
        <MaterialIcons name="play-arrow" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.roundButton, styles.pauseButton]}
        onPress={onStopReading}
      >
        <MaterialIcons name="pause" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
