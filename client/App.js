import React from "react";
import { StatusBar } from "react-native";
import RecommendationsScreen from "./screens/RecommendationsScreen";
import styles from "./components/styles"; // Import styles

const App = () => {
  return (
    <>
      <StatusBar style={styles.statusBar} />
      <RecommendationsScreen />
    </>
  );
};

export default App;
