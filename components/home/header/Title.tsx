import { View, StyleSheet, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { Destination } from "context/destination";
import { styleVars } from "utils/styles";

interface TitleProps {
  destination: Destination;
}

export default function Title(props: TitleProps) {
  const colorScheme = useColorScheme();
  const themeCoordsStyle = colorScheme === "light" ? styles.lightCoords : styles.darkCoords;

  return (
    <View style={styles.container}>
      <Image source={require("assets/img/logo-icon.svg")} style={styles.logo} />

      <View style={styles.text}>
        <Text style={styles.destination} allowFontScaling={false}>
          {props.destination.name}
        </Text>

        <Text style={[styles.coords, themeCoordsStyle]} allowFontScaling={false}>
          {Math.abs(props.destination.region.latitude).toFixed(5)}°{props.destination.region.latitude < 0 ? "S" : "N"},
          {Math.abs(props.destination.region.longitude).toFixed(5)}°{props.destination.region.longitude < 0 ? "W" : "E"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  logo: {
    width: 29,
    height: 36,
    tintColor: styleVars.eaBlue,
  },
  text: {
    rowGap: 2,
  },
  destination: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 24,
    lineHeight: 24,
    color: styleVars.eaBlue,
    textTransform: "uppercase",
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
    color: "rgba(255,255,255,0.75)",
  },
});
