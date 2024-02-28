import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import * as Location from "expo-location";
import { DestinationContext, DestinationContextType } from "context/destination";
import { GemType } from "./gem";
import Map from "components/home/Map";
import Header from "components/home/Header";
import BottomSheet from "components/home/BottomSheet";
import Onboarding from "components/home/Onboarding";
import { getData, removeData } from "utils/helpers";
import { detectDestination } from "utils/detect-destination";
import { styleVars } from "utils/styles";

export default function Home() {
  const router = useRouter();
  const { destination, setDestination } = useContext<DestinationContextType>(DestinationContext);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | undefined>();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showChooseDestination, setShowChooseDestination] = useState(false);
  const [selectedGem, setSelectedGem] = useState<GemType>();
  //removeData("onboarding"); // Used for testing
  //removeData("destination"); // Used for testing

  useEffect(() => {
    // Check if onboarding already shown on init
    (async () => {
      const shown = await getData("onboarding");
      setOnboardingComplete(shown ? true : false); // Get location if onboarding already complete
      setShowOnboarding(!shown ? true : false); // Show onboarding view if not seen already
    })();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync(); // Request

      if (status === "granted") {
        // Device location access granted
        const location = await Location.getCurrentPositionAsync({});
        const destination = detectDestination(location.coords.latitude, location.coords.longitude);
        setDestination(destination);
      } else {
        // Location access not granted
        const storedDestination = await getData("destination");

        if (storedDestination) {
          // Use stored destination from previous session
          setDestination(storedDestination);
        } else {
          // User must select a destination
          router.push({ pathname: "/search", params: { destinationsOnly: true } });
          setShowChooseDestination(true);
          setShowOnboarding(true); // Show select destination button
        }
      }
    };

    if (onboardingComplete) getLocation();
  }, [onboardingComplete]);

  useEffect(() => {
    if (destination) setShowOnboarding(false); // Hide
  }, [destination]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {destination && (
        <>
          <Map
            destination={destination}
            setDestination={setDestination}
            selectedGem={selectedGem}
            setSelectedGem={setSelectedGem}
          />

          <BottomSheet destination={destination} selectedGem={selectedGem} />
          <Header destination={destination} />
        </>
      )}

      {showOnboarding && (
        <Onboarding
          onboardingComplete={onboardingComplete}
          setOnboardingComplete={setOnboardingComplete}
          showChooseDestination={showChooseDestination}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleVars.eaBlue,
  },
});
