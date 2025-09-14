import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/Home";
import AllJobs from "../screens/AllJobs";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AllJobs") {
            iconName = focused ? "briefcase" : "briefcase-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#130160",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontFamily: "DMSansRegular",
          fontSize: 12,
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="AllJobs" component={AllJobs} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
