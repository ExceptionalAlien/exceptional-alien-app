import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import Animated, { useSharedValue, withTiming, Easing, withRepeat, withDelay } from "react-native-reanimated";

export default function HiddenMarker() {
  const opacity = useSharedValue(0.25);

  useEffect(() => {
    opacity.value = withDelay(
      Math.floor(Math.random() * 499),
      withRepeat(withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.quad) }), -1, true)
    );
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      <Image source={require("assets/img/markers/hidden.png")} style={styles.marker} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 40,
    height: 40,
  },
});
