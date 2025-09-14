import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SavedJobs() {
  const navigation = useNavigation();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000";

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("⚠️ No token found");
        setSavedJobs([]);
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/users/saved-jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const data = await res.json();
      setSavedJobs(data.savedJobs || []);
    } catch (err) {
      console.error("Error fetching saved jobs:", err);
      setSavedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSavedJobs();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons name="arrow-back" size={24} color="#130160" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Jobs</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#130160" />
        </View>
      ) : savedJobs.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="bookmark-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No saved jobs yet</Text>
          <Text style={styles.subText}>Start saving jobs to see them here</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {savedJobs.map((job) => (
            <View key={job._id} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <Image
                  source={require("../../assets/logo.png")}
                  style={styles.logo}
                />
                <View>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.company}>{job.company}</Text>
                </View>
              </View>

              <View style={styles.tagsContainer}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{job.location || "N/A"}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{job.type || "N/A"}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => navigation.navigate("Description", { job })}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  jobCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 14,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#130160",
  },
  company: {
    fontSize: 14,
    color: "#524B6B",
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 10,
  },
  tag: {
    backgroundColor: "#EFEFFD",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#130160",
  },
  applyButton: {
    backgroundColor: "#FCA34D",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#130160",
    marginTop: 16,
  },
  subText: {
    fontSize: 14,
    color: "#999",
    marginTop: 6,
    textAlign: "center",
  },
});
