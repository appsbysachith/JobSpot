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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("please fill in all fields ");
      return;
    }
    console.log("Signup values", name, email, password);

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.msg || "Registration failed");
      } else {
        Alert.alert("Success", data.msg || "Registered successfully");
        navigation.replace("Home"); // navigate to Home after signup
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create an Account</Text>
      <Text style={styles.subheading}>
        Sign up to continue your job search journey
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
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
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <Text style={styles.loginButtonText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}> Sign up with Google</Text>
      </TouchableOpacity>

      {/* Signup link */}
      <View style={styles.signup}>
        <Text style={{ color: "#524B6B" }}>Have an account? </Text>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={styles.link}>Sign in</Text>
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
