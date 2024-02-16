import { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import * as Location from "expo-location";
import { DestinationContext, DestinationContextType } from "context/destination";
import Map from "components/home/Map";
import Header from "components/home/Header";
import BottomSheet from "components/home/BottomSheet";
import Onboarding from "components/home/Onboarding";
import { storeData, getData, removeData } from "utils/helpers";
import { styleVars } from "utils/styles";

export default function Home() {
  const { destination, setDestination } = useContext<DestinationContextType>(DestinationContext);
  const [onboardingShown, setOnboardingShown] = useState<boolean | undefined>();

  //storeData("onboarding", true); // !!! Will remove this
  //removeData("onboarding");

  useEffect(() => {
    // Check if onboarding already shown on init
    (async () => {
      const status = await getData("onboarding");
      setOnboardingShown(status ? true : false);
    })();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        // Location access granted
        let location = await Location.getCurrentPositionAsync({});

        // !!! Detect if location is a destination

        setDestination({
          name: "",
          uid: "",
          keywords: "",
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
          // Use Sydney (needed incase user removes location access later)
          setDestination({
            name: "Sydney",
            uid: "sydney",
            keywords: "Australia NSW New South Wales",
            region: {
              latitude: -33.86882,
              longitude: 151.209296,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            },
          });
        }
      }
    };

    if (onboardingShown) getLocation();
  }, [onboardingShown]);

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

      {!onboardingShown && <Onboarding setOnboardingShown={setOnboardingShown} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleVars.eaBlue,
  },
});
