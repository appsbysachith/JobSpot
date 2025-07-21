import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

export default Description = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header: Company Logo + Job Title */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo.png")} // replace with your logo
          style={styles.logo}
        />
        <Text style={styles.jobTitle}>Company name</Text>
      </View>

      {/* Job Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About company</Text>
        <Text style={styles.sectionText}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem...
        </Text>
      </View>

      {/* Job Details */}
      <View style={styles.details}>
        <Text style={styles.detailLabel}>Website</Text>
        <Text style={styles.detailValue}>link</Text>

        <Text style={styles.detailLabel}>Industry</Text>
        <Text style={styles.detailValue}>Internet product</Text>

        <Text style={styles.detailLabel}>Employment size</Text>
        <Text style={styles.detailValue}>121151</Text>

        <Text style={styles.detailLabel}>Head Office</Text>
        <Text style={styles.detailValue}>California</Text>
      </View>

      {/* Apply Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>BACK</Text>
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
    marginBottom: 16,
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
  sectionText: {
    fontSize: 14,
    fontFamily: "DMSansRegular",
    color: "#333",
    lineHeight: 20,
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
