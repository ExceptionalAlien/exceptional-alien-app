import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  withRepeat,
  withDelay,
  withSequence,
  cancelAnimation,
} from "react-native-reanimated";

export default function HiddenMarker() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      Math.floor(Math.random() * 499),
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
          withTiming(0.2, { duration: 1000, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        true
      )
    );

    return () => {
      // Clean up repeat
      cancelAnimation(opacity);
      opacity.value = 0;
    };
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      <Image source={require("assets/img/markers/hidden.png")} style={styles.marker} blurRadius={3} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 40,
    height: 40,
  },
});
