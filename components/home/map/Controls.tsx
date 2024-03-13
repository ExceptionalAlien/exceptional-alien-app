import React from "react";
import { StyleSheet, View, Pressable, Alert, Linking } from "react-native";
import * as Location from "expo-location";
import * as Network from "expo-network";
import Ionicons from "@expo/vector-icons/Ionicons";
import MapView from "react-native-maps";
import { DestinationType } from "context/destination";
import { pressedDefault } from "utils/helpers";
import { detectDestination } from "utils/detect-destination";
import { styleVars } from "utils/styles";

type ControlsProps = {
  destination: DestinationType;
  setDestination: (destination: DestinationType) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  mapRef: React.RefObject<MapView>;
};

export default function Controls(props: ControlsProps) {
  const options = () => {
    alert(
      "WIP - will show filters including Gem categories, favourite Playbooks only and option to only show Playbooks you created"
    );
  };

  const locate = async () => {
    props.setIsLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync(); // Request location
    const network = await Network.getNetworkStateAsync();

    if (status === "granted" && !network.isInternetReachable) {
      // Offline
      props.setIsLoading(false);
      Alert.alert("Cannot Access Location", "Your device location cannot be accessed while offline.");
    } else if (status === "granted") {
      // Device location access granted
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });

      if (
        props.destination.region &&
        location.coords.latitude === props.destination.region.latitude &&
        location.coords.longitude === props.destination.region.longitude
      ) {
        // Device location hasn't changed
        props.setIsLoading(false);

        // Re-center map
        props.mapRef.current?.animateCamera({
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        });
      } else {
        // Device location is different
        const destination = detectDestination(location.coords.latitude, location.coords.longitude);
        props.setDestination(destination);
      }
    } else {
      // Location access not granted
      props.setIsLoading(false);

      Alert.alert("Location Access", "Allow Exceptional ALIEN to use your location in your device settings.", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Settings", onPress: () => Linking.openSettings() },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Options */}
      <Pressable onPress={options} style={({ pressed }) => [pressedDefault(pressed), styles.button]} hitSlop={6}>
        <Ionicons name="options-outline" size={24} color="black" />
      </Pressable>

      {/* Locate */}
      <Pressable onPress={locate} style={({ pressed }) => [pressedDefault(pressed), styles.button]} hitSlop={6}>
        <Ionicons name="locate-outline" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    bottom: "35%",
    marginRight: 12,
    marginBottom: 12,
    gap: 12,
  },
  button: {
    backgroundColor: styleVars.eaLightGrey,
    padding: 8,
    borderRadius: 999,
  },
});
