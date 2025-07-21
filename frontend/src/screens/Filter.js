import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function FilterScreen() {
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState("Select a category");

  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationItems, setLocationItems] = useState([
    { label: "Colombo", value: "Colombo" },
    { label: "Kandy", value: "Kandy" },
    { label: "Mumbai", value: "Mumbai" },
    { label: "Galle", value: "Galle" },
  ]);

  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const [jobType, setJobType] = useState(null);
  const [workplace, setWorkplace] = useState(null);

  const categories = ["UX Design", "Construction", "Software", "Hardware"];

  const handleCategorySelection = (option) => {
    setCategory(option);
    setVisible(false);
  };

  const handleSendFilterData = () => {
    const filters = {
      category,
      location,
      salaryRange: { min: minSalary, max: maxSalary },
      jobType,
      workplace,
    };
    console.log("Filters:", filters);
    navigation.navigate("AllJobs", { filters });
  };

  const resetFilters = () => {
    setCategory("Select a category");
    setLocation(null);
    setMinSalary("");
    setMaxSalary("");
    setJobType(null);
    setWorkplace(null);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Filter</Text>

      {/* Category */}
      <View style={styles.section}>
        <Text style={styles.label}>Category</Text>
        <Pressable style={styles.dropdown} onPress={() => setVisible(true)}>
          <Text style={styles.dropdownText}>
            {category || "Select a category"}
          </Text>
        </Pressable>

        <Modal visible={visible} transparent animationType="fade">
          <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
            <View style={styles.modal}>
              {categories.map((option, index) => (
                <Pressable
                  key={index}
                  style={styles.option}
                  onPress={() => handleCategorySelection(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Modal>
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.label}>Location</Text>
        <DropDownPicker
          placeholder="Select a location"
          open={open}
          value={location}
          items={locationItems}
          setOpen={setOpen}
          setValue={setLocation}
          setItems={setLocationItems}
          zIndex={1000}
          style={{
            borderColor: "#ccc",
            minHeight: 50,
            marginBottom: open ? 200 : 0,
          }}
        />
      </View>

      {/* Salary */}
      <View style={styles.section}>
        <Text style={styles.label}>Salary</Text>
        <View style={styles.row}>
          <TextInput
            placeholder="Min"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            style={[styles.input, styles.halfInput]}
            onChangeText={setMinSalary}
            value={minSalary}
          />
          <TextInput
            placeholder="Max"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            style={[styles.input, styles.halfInput]}
            onChangeText={setMaxSalary}
            value={maxSalary}
          />
        </View>
      </View>

      {/* Job Type */}
      <View style={styles.section}>
        <Text style={styles.label}>Job Type</Text>
        <View style={styles.row}>
          {["Full Time", "Part Time", "Intern"].map((item) => (
            <Pressable
              key={item}
              style={[
                styles.option,
                jobType === item && { backgroundColor: "#FCA34D" },
              ]}
              onPress={() => setJobType(item)}
            >
              <Text
                style={[
                  styles.optionText,
                  jobType === item && { color: "#fff" },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Workplace */}
      <View style={styles.section}>
        <Text style={styles.label}>Workplace Type</Text>
        <View style={styles.row}>
          {["Onsite", "Hybrid", "Remote"].map((item) => (
            <Pressable
              key={item}
              style={[
                styles.option,
                workplace === item && { backgroundColor: "#FCA34D" },
              ]}
              onPress={() => setWorkplace(item)}
            >
              <Text
                style={[
                  styles.optionText,
                  workplace === item && { color: "#fff" },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleSendFilterData}
        >
          <Text style={styles.applyText}>APPLY NOW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.resetText}>RESET</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontFamily: "DMSansBold",
    color: "#130160",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: "DMSansBold",
    color: "#524B6B",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "DMSansRegular",
    color: "#333",
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  option: {
    backgroundColor: "#E6E6E6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
    color: "#130160",
    fontFamily: "DMSansRegular",
  },
  dropdown: {
    backgroundColor: "#F2F2F2",
    padding: 12,
    borderRadius: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: "#999",
    fontFamily: "DMSansRegular",
  },
  buttonContainer: {
    marginTop: 30,
  },
  applyButton: {
    backgroundColor: "#FCA34D",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSansBold",
  },
  resetButton: {
    backgroundColor: "#E6E6E6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  resetText: {
    color: "#130160",
    fontSize: 16,
    fontFamily: "DMSansBold",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
});
