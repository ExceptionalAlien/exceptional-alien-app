import React, { useEffect } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { withTiming, Easing, useSharedValue } from "react-native-reanimated";
import { pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type SelectDestinationProps = {
  visible: boolean;
};

export default function SelectDestination(props: SelectDestinationProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Show/hide banner
    if (props.visible) {
      opacity.value = withTiming(1, { duration: 300, easing: Easing.inOut(Easing.quad) }); // Show
    } else {
      opacity.value = 0; // Hide
    }
  }, [props.visible]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          display: props.visible ? "flex" : "none",
          marginTop: insets.top + 60 + 16 /* Header height + margin */,
        },
      ]}
    >
      <Pressable
        onPress={() => router.push({ pathname: "/search", params: { destinationsOnly: true } })}
        style={({ pressed }) => [pressedDefault(pressed), styles.button]}
      >
        <Text style={styles.text} allowFontScaling={false}>
          Select a destination
        </Text>

        <Ionicons name="arrow-forward-sharp" size={16} color={styleVars.eaBlue} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  text: {
    color: styleVars.eaBlue,
    fontSize: 16,
    fontFamily: "Neue-Haas-Grotesk",
  },
});
