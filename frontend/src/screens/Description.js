import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://localhost:5000";

export default function Description() {
  const navigation = useNavigation();
  const route = useRoute();
  const { job } = route.params;

  const [isSaved, setIsSaved] = useState(false);

  const checkSavedJob = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${API_BASE_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const savedJobs = res.data.user.savedJobs || [];
      setIsSaved(savedJobs.includes(job._id));
    } catch (err) {
      console.error("Error checking saved jobs:", err.message);
    }
  };

  useEffect(() => {
    checkSavedJob();
  }, []);

  const toggleSaveJob = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return alert("Login first!");

      if (!isSaved) {
        await axios.post(
          `${API_BASE_URL}/api/users/save-job`,
          { jobId: job._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsSaved(true);
        alert("Job saved successfully!");
      } else {
        await axios.post(
          `${API_BASE_URL}/api/users/remove-saved-job`,
          { jobId: job._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsSaved(false);
        alert("Job removed from saved jobs.");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to save job");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={{ uri: job.logo }}
            style={styles.logo}
            defaultSource={require("../../assets/logo.png")}
          />
        </TouchableOpacity>
        <Text style={styles.jobTitle}>{job.title}</Text>
      </View>

      <View style={styles.meta}>
        <Text style={styles.companyName}>{job.company}</Text>
        <Text style={styles.metaText}>{job.location}</Text>
        <Text style={styles.metaText}>{job.postedDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        {job.requirements?.map((point, index) => (
          <Text key={index} style={styles.bulletText}>
            • {point}
          </Text>
        ))}
      </View>

      <View style={styles.details}>
        <Text style={styles.detailLabel}>Job Type</Text>
        <Text style={styles.detailValue}>{job.type}</Text>

        <Text style={styles.detailLabel}>Degree</Text>
        <Text style={styles.detailValue}>{job.degree}</Text>

        <Text style={styles.detailLabel}>Work Model</Text>
        <Text style={styles.detailValue}>{job.workModel}</Text>

        <Text style={styles.detailLabel}>Category</Text>
        <Text style={styles.detailValue}>{job.category}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.buttonText}>APPLY NOW</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton, isSaved && styles.saved]}
          onPress={toggleSaveJob}
        >
          <Text style={styles.buttonText}>
            {isSaved ? "UNSAVE JOB" : "SAVED JOB"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.pop()}
        >
          <Text style={styles.backButtonText}>BACK</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 24 },
  header: { alignItems: "center", marginBottom: 16 },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 8,
    borderRadius: 12,
  },
  jobTitle: {
    fontSize: 22,
    fontFamily: "DMSansBold",
    color: "#130160",
    textAlign: "center",
  },
  meta: { alignItems: "center", marginBottom: 24 },
  companyName: { fontSize: 16, fontFamily: "DMSansBold", color: "#524B6B" },
  metaText: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
    fontFamily: "DMSansRegular",
  },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "DMSansBold",
    marginBottom: 8,
    color: "#130160",
  },
  bulletText: {
    fontSize: 14,
    fontFamily: "DMSansRegular",
    color: "#333",
    lineHeight: 22,
    marginBottom: 4,
  },
  details: {
    marginBottom: 32,
    backgroundColor: "#E3F2FD",
    padding: 16,
    borderRadius: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: "DMSansBold",
    color: "#524B6B",
    marginTop: 12,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: "DMSansRegular",
    color: "#333",
    marginTop: 4,
  },
  buttonContainer: { marginBottom: 24 },
  applyButton: {
    backgroundColor: "#FCA34D",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#130160",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  saved: { backgroundColor: "#FF4D6D" },
  backButton: {
    backgroundColor: "#ccc",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontFamily: "DMSansBold" },
  backButtonText: { color: "#130160", fontSize: 16, fontFamily: "DMSansBold" },
});
