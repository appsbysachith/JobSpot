import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default Description = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header: Company Logo + Job Title */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/logo.png")} // Replace with your logo
            style={styles.logo}
          />
        </TouchableOpacity>
        <Text style={styles.jobTitle}>UI/UX Designer</Text>
      </View>

      {/* Upload CV Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload CV</Text>
        <Text style={styles.sectionText}>
          Add your CV/Resume to apply for this job
        </Text>

        <TouchableOpacity style={styles.uploadBox}>
          <AntDesign name="upload" size={24} color="#aaa" />
          <Text style={styles.uploadText}>Tap to upload CV</Text>
        </TouchableOpacity>
      </View>

      {/* Cover Letter Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cover Letter</Text>
        <TextInput
          style={styles.coverLetterInput}
          placeholder="Write your cover letter here..."
          placeholderTextColor="#aaa"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>

      {/* Apply Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>APPLY NOW</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 22,
    fontFamily: "DMSansBold",
    color: "#130160",
    textAlign: "center",
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "DMSansBold",
    marginBottom: 8,
    color: "#130160",
  },
  sectionText: {
    fontSize: 14,
    fontFamily: "DMSansRegular",
    color: "#666",
    marginBottom: 12,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    marginTop: 8,
    fontSize: 14,
    color: "#aaa",
    fontFamily: "DMSansRegular",
  },
  coverLetterInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 16,
    fontSize: 14,
    fontFamily: "DMSansRegular",
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#FCA34D",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSansBold",
  },
});
