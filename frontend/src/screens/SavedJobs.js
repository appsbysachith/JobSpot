import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

export default SavedJobs = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Saved Jobs</Text>

      {/* Placeholder Saved Job Card */}
      <View style={styles.jobCard}>
        <View style={styles.jobHeader}>
          <Image
            source={require("../../assets/logo.png")} // Replace with actual company logo
            style={styles.logo}
          />
          <View>
            <Text style={styles.jobTitle}>UI/UX Designer</Text>
            <Text style={styles.company}>Figma Inc.</Text>
          </View>
        </View>
        <Text style={styles.location}>Remote | Full-time</Text>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>

      {/* Repeat <View style={styles.jobCard}>...</View> for more saved jobs */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  heading: {
    fontSize: 26,
    fontFamily: "DMSansBold",
    color: "#130160",
    marginBottom: 24,
  },
  jobCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 12,
  },
  jobTitle: {
    fontSize: 18,
    fontFamily: "DMSansBold",
    color: "#130160",
  },
  company: {
    fontSize: 14,
    fontFamily: "DMSansRegular",
    color: "#524B6B",
  },
  location: {
    fontSize: 14,
    fontFamily: "DMSansRegular",
    color: "#888",
    marginBottom: 12,
  },
  applyButton: {
    backgroundColor: "#FCA34D",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "DMSansBold",
    fontSize: 14,
    color: "#fff",
  },
});
