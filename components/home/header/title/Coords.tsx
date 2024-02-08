import { useState, useEffect } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import Animated, { useSharedValue, withTiming, Easing } from "react-native-reanimated";
import { styleVars } from "utils/styles";

type CoordsProps = {
  lat: number;
  lng: number;
};

export default function Coords(props: CoordsProps) {
  const colorScheme = useColorScheme();
  const [topCoords, setTopCoords] = useState("");
  const [bottomCoords, setBottomCoords] = useState("");
  const themeCoordsStyle = colorScheme === "light" ? styles.lightCoords : styles.darkCoords;
  const top = useSharedValue(-12);

  useEffect(() => {
    const coords = `${Math.abs(props.lat).toFixed(5)}°${props.lat < 0 ? "S" : "N"},${Math.abs(props.lng).toFixed(5)}°${
      props.lng < 0 ? "W" : "E"
    }`;

    var timeout: undefined | ReturnType<typeof setTimeout>;

    if (!bottomCoords) {
      // Init
      setBottomCoords(coords);
    } else {
      // Animate
      setTopCoords(coords);

      top.value = withTiming(0, {
        duration: 700,
        easing: Easing.inOut(Easing.quad),
      });

      // Reset on animation finish
      timeout = setTimeout(() => {
        setBottomCoords(coords);
        top.value = -12;
      }, 700);
    }

    return () => clearTimeout(timeout);
  }, [props.lat]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wrapper, { top }]}>
        <Text style={[styles.coords, themeCoordsStyle]} allowFontScaling={false}>
          {topCoords}
        </Text>

        <Text style={[styles.coords, themeCoordsStyle]} allowFontScaling={false}>
          {bottomCoords}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 12,
    width: 160,
    overflow: "hidden",
  },
  wrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  coords: {
    fontFamily: "Helvetica-Monospaced",
    fontSize: 12,
    lineHeight: 12,
  },
  lightCoords: {
    color: styleVars.eaGrey,
  },
  darkCoords: {
    color: "white",
  },
});
