import React from "react";
import { StyleSheet, View, Pressable, Alert, Linking } from "react-native";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DestinationType } from "context/destination";
import { pressedDefault } from "utils/helpers";
import { detectDestination } from "utils/detect-destination";
import { styleVars } from "utils/styles";

type ControlsProps = {
  setDestination: (destination: DestinationType) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Controls(props: ControlsProps) {
  const options = () => {
    alert("WIP - will show filters including Gem categories");
  };

  const locate = async () => {
    props.setIsLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync(); // Request location

    if (status === "granted") {
      // Device location access granted
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
      const destination = detectDestination(location.coords.latitude, location.coords.longitude);
      props.setDestination(destination);
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
