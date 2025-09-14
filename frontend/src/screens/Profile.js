import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://localhost:5000";

export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        console.error("Error:", data.msg);
      }
    } catch (err) {
      console.error("Fetch user error:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#130160" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: user?.profileImage || "https://i.pravatar.cc/150?img=12",
        }}
        style={styles.avatar}
      />

      <Text style={styles.name}>{user?.name || "No Name"}</Text>
      <Text style={styles.email}>{user?.email || "No Email"}</Text>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("AccountSettings")}
      >
        <Ionicons name="settings-outline" size={24} color="#130160" />
        <Text style={styles.optionText}>Account Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("SavedJobs")}
      >
        <Ionicons name="bookmark-outline" size={24} color="#130160" />
        <Text style={styles.optionText}>Saved Jobs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          try {
            await AsyncStorage.removeItem("token");
            navigation.replace("Welcome");
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error logging out. Please try again.");
          }
        }}
      >
        <View style={styles.option}>
          <Ionicons name="log-out-outline" size={24} color="#130160" />
          <Text style={styles.optionText}>Logout</Text>
        </View>
      </TouchableOpacity>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
