import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default Logout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <View style={styles.settingRow}>
        <Feather name="bell" size={24} color="#524B6B" style={styles.icon} />
        <Text style={styles.label}>Notification</Text>
        <Switch />
      </View>

      <View style={styles.settingRow}>
        <Feather name="moon" size={24} color="#524B6B" style={styles.icon} />
        <Text style={styles.label}>Dark Mode</Text>
        <Switch />
      </View>

      <TouchableOpacity style={styles.settingRow}>
        <Feather name="lock" size={24} color="#524B6B" style={styles.icon} />
        <Text style={styles.label}>Change Password</Text>
        <Feather name="chevron-right" size={24} color="#aaa" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow}>
        <MaterialCommunityIcons
          name="logout"
          size={24}
          color="#524B6B"
          style={styles.icon}
        />
        <Text style={styles.label}>Logout</Text>
        <Feather name="chevron-right" size={24} color="#aaa" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  heading: {
    fontSize: 26,
    fontFamily: "DMSansBold",
    color: "#130160",
    marginBottom: 32,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9F9F9",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontFamily: "DMSansRegular",
    color: "#524B6B",
  },
});
