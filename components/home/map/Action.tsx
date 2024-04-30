import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { withTiming, Easing, useSharedValue } from "react-native-reanimated";
import { GemsContext, GemsContextType } from "context/gems";
import { pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type ActionRoute = {
  pathname: string;
  params: {
    destinationsOnly?: boolean;
  };
};

type ActionProps = {
  text: string;
  visible: boolean;
  route?: ActionRoute;
};

export default function Action(props: ActionProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setGems } = useContext<GemsContextType>(GemsContext);
  const opacity = useSharedValue(0);

  const click = () => {
    if (props.route) {
      router.push(props.route);
    } else {
      setGems([]); // Clear Playbook Gems
    }
  };

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
      <Pressable onPress={click} style={({ pressed }) => [pressedDefault(pressed), styles.button]} hitSlop={8}>
        {!props.route && (
          <Image source={require("assets/img/icon-gem-blue.svg")} style={styles.icon} contentFit="contain" />
        )}

        <Text style={styles.text} allowFontScaling={false}>
          {props.text}
        </Text>

        {props.route && <Ionicons name="arrow-forward-sharp" size={16} color={styleVars.eaBlue} />}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    opacity: 0,
    alignSelf: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 999,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderColor: styleVars.eaBlue,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  icon: {
    width: 16,
    height: 16,
  },
  text: {
    color: styleVars.eaBlue,
    fontSize: 16,
    fontFamily: "Neue-Haas-Grotesk",
  },
});
