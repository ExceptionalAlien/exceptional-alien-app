import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  withTiming,
  withRepeat,
  useAnimatedStyle,
  Easing,
  useSharedValue,
  cancelAnimation,
} from "react-native-reanimated";

export default function HiddenGemsDetected() {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(withTiming(360, { duration: 2000, easing: Easing.linear }), -1, false);

    return () => {
      // Clean up repeat
      cancelAnimation(rotate);
      rotate.value = 0;
    };
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${rotate.value}deg`,
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hidden Gems detected</Text>

      <Animated.View style={animatedStyles}>
        <MaterialCommunityIcons name="radar" size={24} color="white" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "35%",
    left: "50%",
    marginLeft: -102, // Width is 204px
    backgroundColor: "black",
    padding: 8,
    paddingLeft: 12,
    marginBottom: 12,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: "Neue-Haas-Grotesk",
  },
});
