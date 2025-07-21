// src/navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Auth and flow screens
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Forgot from "../screens/Forgot";
import CheckEmail from "../screens/CheckEmail";
import Successful from "../screens/Successful";
import Splash from "../screens/Splash";

// Main tab navigation
import TabNavigator from "./TabNavigator";

// Other screens outside tab bar
import Company from "../screens/Company";
import Upload from "../screens/Upload";
import UploadSuccessful from "../screens/UploadSuccessful";
import Filter from "../screens/Filter";
import NoResultsFound from "../screens/NoResultsFound";
import SavedJobs from "../screens/SavedJobs";
import NoSavedJobs from "../screens/NoSavedJobs";
import Logout from "../screens/Logout";
import Description from "../screens/Description";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        {/* Authentication and intro flow */}
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="CheckEmail" component={CheckEmail} />
        <Stack.Screen name="Successful" component={Successful} />
        <Stack.Screen name="Splash" component={Splash} />

        {/* Main App with Bottom Tabs */}
        <Stack.Screen name="Main" component={TabNavigator} />

        {/* Standalone stack screens */}
        <Stack.Screen name="Company" component={Company} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="UploadSuccessful" component={UploadSuccessful} />
        <Stack.Screen name="Filter" component={Filter} />
        <Stack.Screen name="NoResultsFound" component={NoResultsFound} />
        <Stack.Screen name="SavedJobs" component={SavedJobs} />
        <Stack.Screen name="NoSavedJobs" component={NoSavedJobs} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="JobDetail" component={Description} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
