import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isLargeScreen = width > 600;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    width: "100%",
  },
  textStyle: {
    color: "black",
    fontSize: isLargeScreen ? 22 : 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  titleStyle: {
    color: "darkblue",
    fontWeight: "bold", // negrita
    fontSize: isLargeScreen ? 28 : 24,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 0,
    backgroundColor: "rgba(173, 216, 230, 0.5)", // very light blue background with some transparency
    padding: 5,
    borderRadius: 5,
    borderWidth: 0, // no border
    fontFamily: "PlayfairDisplay_700Bold",
  },
  descriptionStyle: {
    color: "darkblue",
    fontSize: isLargeScreen ? 28 : 24,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 5,
    backgroundColor: "rgba(173, 216, 230, 0.5)", // very light blue background with some transparency
    padding: 5,
    borderRadius: 25,
    borderWidth: 0, // no border
  },
  card: {
    flex: 1,
    padding: 10,
    marginVertical: 0,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    elevation: 3,
    width: "100%",
    maxWidth: isLargeScreen ? 600 : "100%",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: isLargeScreen ? 480 : 420, // 10% longer than original
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Adjust the image to cover the entire space without white borders
    borderRadius: 25,
  },
  button: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
  summaryContainer: {
    width: "100%",
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  summaryText: {
    fontSize: isLargeScreen ? 20 : 16,
    textAlign: "justify",
    color: "#333",
  },
  pickerContainer: {
    marginTop: 10,
    marginBottom: 60,
    width: "100%",
    alignItems: "center",
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  containerB: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    backgroundColor: "#4CAF50", // Green color for play button
  },
  pauseButton: {
    backgroundColor: "#f44336", // Red color for pause button
  },
});

export default styles;
