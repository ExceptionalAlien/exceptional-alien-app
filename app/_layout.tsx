import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { DestinationContext, Destination } from "context/destination";
import { styleVars } from "utils/styles";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();

  // Sydney is default destination
  const [destination, setDestination] = useState<Destination>({
    name: "Sydney",
    uid: "sydney",
    country: "Australia",
    region: {
      latitude: -33.865143,
      longitude: 151.2099,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
  });

  const [fontsLoaded, fontError] = useFonts({
    "Helvetica-Monospaced": require("../assets/fonts/Helvetica-Monospaced-W06-Rg.ttf"),
    "Neue-Haas-Grotesk": require("../assets/fonts/NHaasGroteskDSStd-55Rg.ttf"),
    "Neue-Haas-Grotesk-Med": require("../assets/fonts/NHaasGroteskDSStd-65Md.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Show splash until fonts ready
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
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
    </DestinationContext.Provider>
  );
}
