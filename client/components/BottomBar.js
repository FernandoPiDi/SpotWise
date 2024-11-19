import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

const BottomBar = ({ onToggleReading, isReading }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isReading) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isReading, colorAnim, scaleAnim]);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#2196F3", "#4CAF50"],
  });

  return (
    <View style={styles.containerB}>
      <Animated.View
        style={[
          styles.roundButton,
          { transform: [{ scale: scaleAnim }], backgroundColor },
        ]}
      >
        <TouchableOpacity onPress={onToggleReading}>
          <MaterialIcons
            name={isReading ? "pause" : "play-arrow"}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default BottomBar;
