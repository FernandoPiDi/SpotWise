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
    marginTop: -5,
    marginLeft: -5,
    marginRight: -5,
    borderBottomLeftRadius: 15 /* Ajusta el valor según el nivel de redondeo que desees */,
    borderBottomRightRadius: 15,
    backgroundColor: "rgba(173, 216, 230, 0.5)", // very light blue background with some transparency
    padding: 3,
    //borderRadius: 20,
    borderWidth: 0, // no border
    fontFamily: "PlayfairDisplay_700Bold",
  },
  descriptionStyle: {
    color: "darkblue",
    fontSize: isLargeScreen ? 28 : 24,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 3,
    backgroundColor: "rgba(173, 216, 230, 0.5)", // very light blue background with some transparency
    padding: 5,
    borderRadius: 25,
    borderWidth: 0, // no border
  },
  card: {
    flex: 1,
    padding: 5,
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
    height: isLargeScreen ? 480 : 420,
  },
  image: {
    width: "100%",
    //height: "100%",
    height: isLargeScreen ? 480 : 420,
    resizeMode: "cover", // Adjust the image to cover the entire space without white borders
    borderRadius: 25,
  },
  buttonMaps: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 12,
    borderWidth: 0, // no border
  },
  summaryContainer: {
    width: "100%",
    marginTop: 3,
    borderRadius: 15,
    padding: 10,
    // paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
  },
  summaryText: {
    fontSize: isLargeScreen ? 20 : 16,
    textAlign: "justify",
    color: "#333",
  },
  pickerContainer: {
    marginTop: 5,
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
    borderRadius: 30,
    padding: 10,
    zIndex: 1,
    borderWidth: 1,
    borderColor: "white",
  },
  containerB: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center", // Center the button
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
  // toggleButton: {
  //   backgroundColor: "#2196F3", // Blue color for the toggle button
  // },
  placeNameStyle: {
    color: "black",
    fontSize: isLargeScreen ? 22 : 18,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 3,
    marginBottom: 3,
    backgroundColor: "#f0f0f0", // Light gray background
    padding: 10,
    borderRadius: 20, // Rounded borders
  },
  statusBar: {
    barStyle: "light-content",
    backgroundColor: "#000",
  },
});

export default styles;
