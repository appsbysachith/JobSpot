import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

export default Login = () => {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Check Your Email</Text>
      <Text style={styles.subheading}>
        We have sent the reset password to the email address
      </Text>

      <View
        style={{
          marginBottom: 50,
          marginTop: 50,

          flex: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={require("../../assets/emailsent.png")} />
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>OPEN YOUR EMAIL</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}> Back to Login</Text>
      </TouchableOpacity>

      <View style={styles.signup}>
        <Text style={{ color: "#524B6B" }}>Don’t have an account? </Text>
        <TouchableOpacity>
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
