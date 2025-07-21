import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=12" }} // Sample avatar
        style={styles.avatar}
      />

      {/* Name */}
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Buttons */}
      <View style={styles.option}>
        <Ionicons name="settings-outline" size={24} color="#130160" />
        <Text style={styles.optionText}>Account Settings</Text>
      </View>

      <View style={styles.option}>
        <Ionicons name="bookmark-outline" size={24} color="#130160" />
        <Text style={styles.optionText}>Saved Jobs</Text>
      </View>

      <View style={styles.option}>
        <Ionicons name="log-out-outline" size={24} color="#130160" />
        <Text style={styles.optionText}>Logout</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "DMSansBold",
    color: "#130160",
  },
  email: {
    fontSize: 14,
    fontFamily: "DMSansRegular",
    color: "gray",
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    width: "80%",
    marginVertical: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "DMSansRegular",
    marginLeft: 12,
    color: "#130160",
  },
});
