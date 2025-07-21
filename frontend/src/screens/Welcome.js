import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          alignItems: "flex-end",
          position: "absolute",
          top: 30,
          right: 30,
        }}
      >
        <Image source={require("../../assets/logo.png")} />
      </View>
      <Image
        source={require("../../assets/welcomImage.png")}
        style={styles.image}
        resizeMethod="contain"
      />
      <Text style={styles.heading}> Find a perfect match</Text>
      <Text style={styles.para}>
        Finding your dream job i more easier and faster with JobHub
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <AntDesign name="arrowright" style={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 51,
    paddingHorizontal: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontFamily: "DMSansBold",
    fontSize: 40,
    lineHeight: 48,
    color: "#FCA34D",
  },
  para: {
    fontFamily: "DMSansRegular",
    fontSize: 14,
    color: "#524B6B",
  },
  button: {
    width: 60,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#130160",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
  },
});
