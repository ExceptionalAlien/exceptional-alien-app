import { StyleSheet, Text, useColorScheme } from "react-native";
import { styleVars } from "utils/styles";

interface CoordsProps {
  lat: number;
  lng: number;
}

export default function Coords(props: CoordsProps) {
  const colorScheme = useColorScheme();
  const themeCoordsStyle = colorScheme === "light" ? styles.lightCoords : styles.darkCoords;

  return (
    <Text style={[styles.container, themeCoordsStyle]} allowFontScaling={false}>
      {Math.abs(props.lat).toFixed(5)}°{props.lat < 0 ? "S" : "N"},{Math.abs(props.lng).toFixed(5)}°
      {props.lng < 0 ? "W" : "E"}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
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
