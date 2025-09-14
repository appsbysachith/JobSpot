import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://localhost:5000";

export default function AccountSettings() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150?img=12"
  );

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUsername(data.user?.name || "");
        setEmail(data.user?.email || "");
        setProfileImage(data.user?.profileImage || profileImage);
      } else {
        console.error("Error:", data.msg);
      }
    } catch (err) {
      console.error("Fetch user error:", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      uploadPhoto(uri);
    }
  };

  const uploadPhoto = async (uri) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "You must be logged in.");
      return;
    }

    let file;
    if (Platform.OS === "web") {
      const response = await fetch(uri);
      const blob = await response.blob();
      file = new File([blob], "profile.jpg", { type: blob.type });
    } else {
      file = { uri, name: "profile.jpg", type: "image/jpeg" };
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/upload-photo`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setProfileImage(data.profileImage);
        Alert.alert("Success", "Profile photo updated!");
      } else {
        Alert.alert("Error", data.msg || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const saveChanges = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return Alert.alert("Error", "You must be logged in.");

    let body = {};
    if (username) body.name = username;
    if (email) body.email = email;
    if (password) body.password = password;

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Account updated successfully!");
        setPassword("");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.msg || "Update failed");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons name="arrow-back" size={24} color="#130160" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: profileImage }} style={styles.avatar} />
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Ionicons name="camera-outline" size={18} color="#fff" />
            <Text style={styles.uploadText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#130160",
  },
  container: { padding: 20, backgroundColor: "#fff" },
  avatarContainer: { alignItems: "center", marginBottom: 30 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  uploadButton: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#130160",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  uploadText: { color: "#fff", marginLeft: 6, fontSize: 14 },
  section: { marginBottom: 20 },
  label: {
    fontSize: 14,
    color: "#130160",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  saveButton: {
    backgroundColor: "#130160",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
