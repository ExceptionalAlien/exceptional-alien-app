import React, { useEffect } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { withTiming, Easing, useSharedValue } from "react-native-reanimated";
import { pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type NoGemsProps = {
  visible: boolean;
};

export default function NoGems(props: NoGemsProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const marginBottom = useSharedValue(-52);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Show/hide banner
    if (props.visible) {
      // Show
      marginBottom.value = withTiming(12, { duration: 200, easing: Easing.out(Easing.quad) });
      opacity.value = withTiming(1, { duration: 300, easing: Easing.inOut(Easing.quad) });
    } else {
      // Hide
      marginBottom.value = withTiming(-52, { duration: 200, easing: Easing.in(Easing.quad) });
      opacity.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.quad) });
    }
  }, [props.visible]);

  return (
    <>
      <Animated.View
        style={[styles.bannerTop, { opacity, marginTop: insets.top + 60 + 16 /* Header height + margin */ }]}
      >
        <Pressable
          onPress={() => router.push({ pathname: "/search", params: { destinationsOnly: true } })}
          style={({ pressed }) => [pressedDefault(pressed), styles.button]}
        >
          <Text style={styles.topText}>Explore a destination</Text>
          <Ionicons name="arrow-forward-sharp" size={16} color={styleVars.eaBlue} />
        </Pressable>
      </Animated.View>

      <Animated.View style={[styles.bannerBottom, { marginBottom }]}>
        <Text style={styles.bottomText}>No Gems nearby</Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  bannerTop: {
    position: "absolute",
    left: "50%",
    marginLeft: -96,
    opacity: 0,
  },
  button: {
    width: 192,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 999,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderColor: styleVars.eaBlue,
    borderWidth: 1,
  },
  topText: {
    color: styleVars.eaBlue,
    fontSize: 16,
    fontFamily: "Neue-Haas-Grotesk",
  },
  bannerBottom: {
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
  bottomText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Neue-Haas-Grotesk",
  },
});
