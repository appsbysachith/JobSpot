import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default NoResults = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/nojobs.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.heading}>No results found</Text>
      <Text style={styles.subheading}>
        The search could not be found, please check spelling or try another
        word.
      </Text>

      <TouchableOpacity style={styles.browseButton}>
        <Text style={styles.browseButtonText}>BROWSE JOBS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 28,
    paddingTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  heading: {
    fontFamily: "DMSansBold",
    fontSize: 28,
    color: "#130160",
    marginBottom: 8,
    textAlign: "center",
  },
  subheading: {
    fontFamily: "DMSansRegular",
    fontSize: 14,
    color: "#524B6B",
    marginBottom: 32,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  browseButton: {
    backgroundColor: "#130160",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  browseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSansBold",
  },
});
