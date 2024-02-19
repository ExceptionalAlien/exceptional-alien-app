import { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import * as Location from "expo-location";
import destinationsData from "data/destinations.json";
import { DestinationContext, DestinationContextType, DestinationType } from "context/destination";
import Map from "components/home/Map";
import Header from "components/home/Header";
import BottomSheet from "components/home/BottomSheet";
import Onboarding from "components/home/Onboarding";
import { getData, removeData } from "utils/helpers";
import { styleVars } from "utils/styles";

export default function Home() {
  const router = useRouter();
  const { destination, setDestination } = useContext<DestinationContextType>(DestinationContext);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | undefined>();
  const [showOnboarding, setShowOnboarding] = useState(false);
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
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        // Device location access granted
        const location = await Location.getCurrentPositionAsync({});
        const data = JSON.stringify(destinationsData);
        const json = JSON.parse(data);
        var userDestination: DestinationType;

        // Loop destinations and detect if device is within a destination's bounds
        for (let i = 0; i < json.length; i++) {
          let bounds = json[i].bounds;

          if (
            location.coords.latitude >= bounds.latitudeStart &&
            location.coords.latitude <= bounds.latitudeEnd &&
            location.coords.longitude >= bounds.longitudeStart &&
            location.coords.longitude <= bounds.longitudeEnd
          ) {
            userDestination = json[i];
            break;
          }
        }

        setDestination({
          name: userDestination! ? userDestination.name : "",
          uid: userDestination! ? userDestination.uid : "",
          region: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
        });
      } else {
        // Location access not granted
        const storedDestination = await getData("destination");

        if (storedDestination) {
          // Use stored destination
          setDestination(storedDestination);
        } else {
          // User must select a destination
          router.push({ pathname: "/search", params: { destinationsOnly: true } });
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
          <Map region={destination.region} />
          <BottomSheet destination={destination} />
          <Header destination={destination} />
        </>
      )}

      {showOnboarding && (
        <Onboarding onboardingComplete={onboardingComplete} setOnboardingComplete={setOnboardingComplete} />
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
