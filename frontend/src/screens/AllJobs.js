import React, { useEffect, useState } from "react";
import {
  View,
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

const API_BASE_URL = "http://localhost:5000";

export default function AllJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const { filter } = route.params || {};

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/jobs`);
      setAllJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    let newFiltered = allJobs;

    if (filter) {
      if (filter.title) {
        newFiltered = newFiltered.filter((job) =>
          job.title.toLowerCase().includes(filter.title.toLowerCase())
        );
        setTitleFilter(filter.title);
      }

      if (filter.location) {
        newFiltered = newFiltered.filter((job) =>
          job.location.toLowerCase().includes(filter.location.toLowerCase())
        );
        setLocationFilter(filter.location);
      }

      if (filter.category) {
        newFiltered = newFiltered.filter(
          (job) => job.category === filter.category
        );
      }

      if (filter.jobType) {
        newFiltered = newFiltered.filter((job) => job.type === filter.jobType);
      }

      if (filter.workplace) {
        newFiltered = newFiltered.filter(
          (job) => job.workplace === filter.workplace
        );
      }

      if (filter.salaryRange) {
        const { min, max } = filter.salaryRange;
        newFiltered = newFiltered.filter((job) => {
          const salary = parseFloat(job.salary);
          if (min && max) return salary >= min && salary <= max;
          if (min) return salary >= min;
          if (max) return salary <= max;
          return true;
        });
      }
    }

    setFilteredJobs(newFiltered);
  }, [allJobs, filter]);

  useEffect(() => {
    let newFiltered = allJobs.filter((job) => {
      const matchTitle = titleFilter
        ? job.title.toLowerCase().includes(titleFilter.toLowerCase())
        : true;
      const matchLocation = locationFilter
        ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
        : true;
      return matchTitle && matchLocation;
    });

    setFilteredJobs(newFiltered);
  }, [titleFilter, locationFilter, allJobs]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search job title"
          placeholderTextColor="#999"
          value={titleFilter}
          onChangeText={setTitleFilter}
        />
        <TextInput
          style={styles.input}
          placeholder="Search location"
          placeholderTextColor="#999"
          value={locationFilter}
          onChangeText={setLocationFilter}
        />

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate("Filter")}
        >
          <Feather name="filter" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

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
                activeOpacity={0.8}
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
    backgroundColor: "#f9f9f9",
  },
  searchContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterButton: {
    backgroundColor: "#130160",
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    width: 50,
    alignSelf: "flex-end",
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobsContainer: {
    marginTop: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginTop: 60,
  },
  jobCard: {
    backgroundColor: "#E3F2FD",
    padding: 20,
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  jobTitle: {
    fontSize: 17,
    color: "#130160",
    marginBottom: 6,
  },
  jobCompany: {
    fontSize: 14,
    color: "#0D47A1",
    marginBottom: 4,
  },
  jobMeta: {
    fontSize: 12,
    color: "#1565C0",
  },
});
