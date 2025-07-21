import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import AppNavigator from "./src/navigation/AppNavigator";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync(); // wait until fonts are loaded

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        DMSansBold: require("../frontend/assets/fonts/DMSans-Bold.ttf"),
        DMSansRegular: require("../frontend/assets/fonts/DMSans-Regular.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); // hide splash only after fonts loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null; // don’t render app until fonts loaded

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <AppNavigator />
    </View>
  );
}
