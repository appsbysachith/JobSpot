import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Description() {
  const navigation = useNavigation();
  const route = useRoute();
  const { job } = route.params;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header: Company Logo + Job Title */}
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

      {/* Company Info */}
      <View style={styles.meta}>
        <Text style={styles.companyName}>{job.company}</Text>
        <Text style={styles.metaText}>{job.location}</Text>
        <Text style={styles.metaText}>{job.postedDate}</Text>
      </View>

      {/* Job Description
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Description</Text>
        {job.description?.map((point, index) => (
          <Text key={index} style={styles.bulletText}>
            • {point}
          </Text>
        ))}
      </View> */}

      {/* Requirements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        {job.requirements?.map((point, index) => (
          <Text key={index} style={styles.bulletText}>
            • {point}
          </Text>
        ))}
      </View>

      {/* Job Details */}
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

      {/* Apply Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>APPLY NOW</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.pop()}>
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 8,
    borderRadius: 8,
  },
  jobTitle: {
    fontSize: 22,
    fontFamily: "DMSansBold",
    color: "#130160",
    textAlign: "center",
  },
  meta: {
    alignItems: "center",
    marginBottom: 24,
  },
  companyName: {
    fontSize: 16,
    fontFamily: "DMSansBold",
    color: "#524B6B",
  },
  metaText: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
    fontFamily: "DMSansRegular",
  },
  section: {
    marginBottom: 24,
  },
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
    backgroundColor: "#F8F8F8",
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
  button: {
    backgroundColor: "#FCA34D",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSansBold",
  },
});
