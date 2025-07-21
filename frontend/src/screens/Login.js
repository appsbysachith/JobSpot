import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import Constants from "expo-constants";

export default Login = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please enter details");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        Alert.alert("Login Failed", data.msg || "Invalid credentials");
      } else {
        Alert.alert("Login Success", data.msg);
        // TODO: Save token if needed using AsyncStorage
        navigation.replace("Home"); // navigate to Home screen
      }
    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={styles.subheading}>
        Sign in to continue your job search journey
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.row}>
        <Pressable
          style={styles.checkboxContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checked]} />
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </Pressable>

        <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}> Sign in with Google</Text>
      </TouchableOpacity>

      {/* Signup link */}
      <View style={styles.signup}>
        <Text style={{ color: "#524B6B" }}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 28,
    paddingTop: 80,
  },
  heading: {
    fontFamily: "DMSansBold",
    fontSize: 32,
    color: "#130160",
    marginBottom: 8,
  },
  subheading: {
    fontFamily: "DMSansRegular",
    fontSize: 14,
    color: "#524B6B",
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#F5F5F5",
    fontFamily: "DMSansRegular",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#aaa",
    marginRight: 8,
  },
  checked: {
    backgroundColor: "#130160",
    borderColor: "#130160",
  },
  checkboxLabel: {
    fontFamily: "DMSansRegular",
    color: "#524B6B",
  },
  link: {
    color: "#FCA34D",
    fontFamily: "DMSansBold",
  },
  loginButton: {
    backgroundColor: "#130160",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSansBold",
  },
  googleButton: {
    backgroundColor: "#4285F4",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 24,
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSansBold",
    marginLeft: 8,
  },
  signup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
