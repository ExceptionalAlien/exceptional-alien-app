import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { withTiming, Easing, useSharedValue } from "react-native-reanimated";
import { styleVars } from "utils/styles";

type NoGemsProps = {
  visible: boolean;
};

export default function NoGems(props: NoGemsProps) {
  const marginBottom = useSharedValue(-52);

  useEffect(() => {
    // Show/hide banner
    if (props.visible) {
      marginBottom.value = withTiming(12, { duration: 200, easing: Easing.out(Easing.quad) }); // Show
    } else {
      marginBottom.value = withTiming(-52, { duration: 200, easing: Easing.in(Easing.quad) }); // Hide
    }
  }, [props.visible]);

  return (
    <Animated.View style={[styles.container, { marginBottom }]}>
      <Text style={styles.text} allowFontScaling={false}>
        No Gems found
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "35%",
    left: "50%",
    width: 144,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -72,
    backgroundColor: styleVars.eaRed,
    borderRadius: 999,
    marginBottom: -52,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: "Neue-Haas-Grotesk",
  },
});
