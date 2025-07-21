import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AllJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { filter } = route.params || {};

  console.log("Received filters:", filter);

  // Helper: Apply filters to job list
  const applyFilters = (jobsList, filters) => {
    return jobsList.filter((job) => {
      const matchTitle = filters.title
        ? job.title.toLowerCase().includes(filters.title.toLowerCase())
        : true;
      const matchLocation = filters.location
        ? job.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchType = filters.type
        ? job.type.toLowerCase() === filters.type.toLowerCase()
        : true;

      return matchTitle && matchLocation && matchType;
    });
  };

  // Fetch jobs from backend and apply filters if available
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://192.168.217.31:5000/api/jobs");
      setAllJobs(response.data);

      if (filter) {
        const filtered = applyFilters(response.data, filter);
        setFilteredJobs(filtered);
      } else {
        setFilteredJobs(response.data);
      }
    } catch (error) {
      console.error("❌ Failed to fetch jobs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 🔍 Search Filters */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search job title or category"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Search location"
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate("Filter")}
        >
          <Feather name="filter" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 📄 Job List */}
      <View style={styles.jobsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#130160" />
        ) : filteredJobs.length === 0 ? (
          <Text style={styles.placeholderText}>No jobs found.</Text>
        ) : (
          <FlatList
            data={filteredJobs}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.jobCard}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("JobDetail", { job: item })}
              >
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.jobCompany}>{item.company}</Text>
                <Text style={styles.jobMeta}>
                  {item.type} • {item.location}
                </Text>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  searchContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "DMSansRegular",
    color: "#333",
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: "#130160",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 50,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  jobsContainer: {
    marginTop: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: "#aaa",
    fontFamily: "DMSansRegular",
    textAlign: "center",
    marginTop: 60,
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
    marginTop: 4,
  },
  jobMeta: {
    fontSize: 12,
    fontFamily: "DMSansRegular",
    color: "#999",
    marginTop: 2,
  },
});
