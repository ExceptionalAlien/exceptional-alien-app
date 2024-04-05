import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import * as Device from "expo-device";
import * as ScreenOrientation from "expo-screen-orientation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DestinationContext, DestinationType } from "context/destination";
import { FiltersContext, FiltersType } from "context/filters";
import { FavsContext } from "context/favs";
import { styleVars } from "utils/styles";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();
  const [destination, setDestination] = useState<DestinationType>();
  const [filters, setFilters] = useState<FiltersType>({ categories: [], favsOnly: false, bookmarksOnly: false });
  const [favs, setFavs] = useState<string[]>();

  const [fontsLoaded, fontError] = useFonts({
    "Helvetica-Monospaced": require("../assets/fonts/Helvetica-Monospaced-W06-Rg.ttf"),
    "Neue-Haas-Grotesk": require("../assets/fonts/NHaasGroteskDSStd-55Rg.ttf"),
    "Neue-Haas-Grotesk-Med": require("../assets/fonts/NHaasGroteskDSStd-65Md.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  // Show splash until fonts ready
  if (!fontsLoaded && !fontError) return null;

  const changeScreenOrientation = async () => {
    await ScreenOrientation.unlockAsync();
  };

  // Allow landscape on tablets
  if (Device.deviceType === 2) changeScreenOrientation();

  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
      <FiltersContext.Provider value={{ filters, setFilters }}>
        <FavsContext.Provider value={{ favs, setFavs }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                contentStyle: { backgroundColor: colorScheme === "light" ? "white" : "black" },
                headerTintColor: colorScheme === "light" ? styleVars.eaBlue : "white",
                headerTitleStyle: {
                  fontFamily: "Neue-Haas-Grotesk-Med",
                },
                headerLargeTitle: true,
                headerLargeTitleStyle: {
                  fontFamily: "Neue-Haas-Grotesk-Med",
                },
                headerBackTitle: "Back",
                headerBackTitleStyle: {
                  fontFamily: "Neue-Haas-Grotesk",
                },
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: colorScheme === "light" ? "white" : "black",
                },
              }}
            >
              <Stack.Screen
                name="filters"
                options={{
                  presentation: "modal",
                  headerLargeTitle: false,
                }}
              />
            </Stack>
          </GestureHandlerRootView>
        </FavsContext.Provider>
      </FiltersContext.Provider>
    </DestinationContext.Provider>
  );
}
