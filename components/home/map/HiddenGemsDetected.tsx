import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  withTiming,
  withRepeat,
  useAnimatedStyle,
  Easing,
  useSharedValue,
  cancelAnimation,
} from "react-native-reanimated";
import { styleVars } from "utils/styles";

type HiddenGemsDetectedProps = {
  hiddenGemCount: number;
};

export default function HiddenGemsDetected(props: HiddenGemsDetectedProps) {
  const rotate = useSharedValue(0);
  const marginBottom = useSharedValue(-52);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${rotate.value}deg`,
      },
    ],
  }));

  useEffect(() => {
    rotate.value = withRepeat(withTiming(360, { duration: 2000, easing: Easing.linear }), -1, false); // Rotate radar icon

    return () => {
      // Clean up repeat
      cancelAnimation(rotate);
      rotate.value = 0;
    };
  }, []);

  useEffect(() => {
    // Show/hide banner
    if (props.hiddenGemCount) {
      marginBottom.value = withTiming(12, { duration: 200, easing: Easing.out(Easing.quad) }); // Show
    } else {
      marginBottom.value = withTiming(-52, { duration: 200, easing: Easing.in(Easing.quad) }); // Hide
    }
  }, [props.hiddenGemCount]);

  return (
    <Animated.View style={[styles.container, { marginBottom }]}>
      <Text style={styles.text}>Hidden Gems detected</Text>

      <Animated.View style={animatedStyles}>
        <MaterialCommunityIcons name="radar" size={24} color="white" />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "35%",
    left: "50%",
    marginLeft: -106, // Width is 212px
    backgroundColor: styleVars.eaRed,
    padding: 8,
    paddingLeft: 16,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: "Neue-Haas-Grotesk",
  },
});
