import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Home = () => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [jobFilter, setJobFilter] = useState(null);

  const navigation = useNavigation();
  const API_BASE_URL = "http://localhost:5000";

  const fetchUser = async () => {
    try {
      setLoadingUser(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoadingUser(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = response.data.user || response.data;
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user:", error.message);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  const filteredJobs = jobFilter
    ? jobs.filter(
        (job) => job.workModel.toLowerCase() === jobFilter.toLowerCase()
      )
    : jobs;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {loadingUser ? (
          <ActivityIndicator size="small" color="#130160" />
        ) : (
          <>
            <Text style={styles.greeting}>Hello {user?.name || "User"} 👋</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Image
                source={
                  user?.profileImage
                    ? { uri: user.profileImage }
                    : require("../../assets/profile.png")
                }
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Find your job</Text>
        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={[
              styles.categoryCard,
              jobFilter === "remote" && styles.categoryCardActive,
            ]}
            onPress={() => setJobFilter("remote")}
          >
            <Ionicons name="briefcase-outline" size={24} color="#fff" />
            <Text style={styles.categoryText}>Remote Job</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryCard,
              jobFilter === "onsite" && styles.categoryCardActive,
            ]}
            onPress={() => setJobFilter("onsite")}
          >
            <Ionicons name="business-outline" size={24} color="#fff" />
            <Text style={styles.categoryText}>On-site</Text>
          </TouchableOpacity>
        </View>

        {jobFilter && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setJobFilter(null)}
          >
            <Text style={styles.clearButtonText}>Clear Filter</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.section, { flex: 1 }]}>
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Job List</Text>
          <TouchableOpacity onPress={() => navigation.navigate("AllJobs")}>
            <Text style={styles.linkText}>See All Jobs</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.jobCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("JobDetail", { job: item })}
            >
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.jobCompany}>{item.company}</Text>
              <Text style={styles.jobType}>
                {item.type} • {item.location}
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  greeting: { fontSize: 22, fontFamily: "DMSansBold", color: "#130160" },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  section: { marginBottom: 32 },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "DMSansBold",
    color: "#130160",
    marginBottom: 16,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  linkText: { fontSize: 14, color: "#FCA34D", fontFamily: "DMSansBold" },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  categoryCard: {
    backgroundColor: "#FCA34D",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
  categoryCardActive: { borderWidth: 2, borderColor: "#fff" },
  categoryText: {
    marginTop: 8,
    color: "#fff",
    fontFamily: "DMSansBold",
    fontSize: 14,
    textAlign: "center",
  },
  clearButton: {
    backgroundColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  clearButtonText: { color: "#130160", fontFamily: "DMSansBold", fontSize: 13 },
  jobCard: {
    backgroundColor: "#E0F7FA",
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: "DMSansBold",
    color: "#130160",
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
    fontFamily: "DMSansRegular",
    color: "#00796B",
    marginBottom: 2,
  },
  jobType: { fontSize: 12, fontFamily: "DMSansRegular", color: "#004D40" },
});
