import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

export default Home = () => {
  const [jobs, setJobs] = useState([]);
  const navigation = useNavigation();
  // const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
  const API_BASE_URL = "http://192.168.22.31:5000";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/jobs`);
        console.log("📦 Jobs response:", response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error.message);
      }
    };

    fetchJobs();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header: Greeting + Profile Pic */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello Sachith 👋</Text>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.profileImage}
        />
      </View>

      {/* Section: Job Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Find your job</Text>
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="briefcase-outline" size={24} color="#fff" />
            <Text style={styles.categoryText}>Remote Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="business-outline" size={24} color="#fff" />
            <Text style={styles.categoryText}>On-site</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="laptop-outline" size={24} color="#fff" />
            <Text style={styles.categoryText}>Freelance</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section: Recent Jobs + See All Jobs */}
      <View style={[styles.section, { flex: 1 }]}>
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Job List</Text>
          <TouchableOpacity onPress={() => navigation.navigate("AllJobs")}>
            <Text style={styles.linkText}>See All Jobs</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={jobs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.jobCard}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate("JobDetail", { job: item });
                console.log("Job tapped:", item.title);
              }}
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
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  greeting: {
    fontSize: 22,
    fontFamily: "DMSansBold",
    color: "#130160",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  section: {
    marginBottom: 32,
  },
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
  linkText: {
    fontSize: 14,
    color: "#FCA34D",
    fontFamily: "DMSansBold",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryCard: {
    backgroundColor: "#FCA34D",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  categoryText: {
    marginTop: 8,
    color: "#fff",
    fontFamily: "DMSansBold",
    fontSize: 14,
    textAlign: "center",
  },
  jobCard: {
    backgroundColor: "#F1F4FF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: "DMSansBold",
    color: "#130160",
  },
  jobCompany: {
    fontSize: 14,
    fontFamily: "DMSansRegular",
    color: "#666",
  },
  jobType: {
    fontSize: 12,
    fontFamily: "DMSansRegular",
    color: "#999",
  },
});
