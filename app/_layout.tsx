import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import * as Device from "expo-device";
import * as ScreenOrientation from "expo-screen-orientation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DestinationContext, DestinationType } from "context/destination";
import { styleVars } from "utils/styles";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();

  const [destination, setDestination] = useState<DestinationType>({
    name: "",
    uid: "",
    keywords: "",
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
  });

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: colorScheme === "light" ? "white" : styleVars.eaGrey },
            headerTintColor: styleVars.eaBlue,
            headerTitleStyle: {
              fontFamily: "Neue-Haas-Grotesk-Med",
            },
            headerLargeTitle: true,
            headerLargeTitleStyle: {
              fontFamily: "Neue-Haas-Grotesk-Med",
            },
            headerTransparent: true,
            headerBackTitle: "Back",
            headerBackTitleStyle: {
              fontFamily: "Neue-Haas-Grotesk",
            },
            headerShadowVisible: false,
          }}
        />
      </GestureHandlerRootView>
    </DestinationContext.Provider>
  );
}
