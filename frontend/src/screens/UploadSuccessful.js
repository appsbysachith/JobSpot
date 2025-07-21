import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

export default Description = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/successful.png")}
        style={styles.successImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>Successful</Text>
      <Text style={styles.subtitle}>
        Congratulations! Your application has been sent.
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>FIND A SIMILAR JOB</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          BACK TO HOME
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  successImage: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "DMSansBold",
    color: "#130160",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "DMSansRegular",
    color: "#524B6B",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#FCA34D",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSansBold",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "#E6E6E6",
  },
  secondaryButtonText: {
    color: "#130160",
  },
});
