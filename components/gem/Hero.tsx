import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View, useWindowDimensions, Text } from "react-native";
import * as Device from "expo-device";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { styleVars } from "utils/styles";

type HeroProps = {
  url: string;
  location: { latitude: number; longitude: number };
};

export default function Hero(props: HeroProps) {
  const { width, height } = useWindowDimensions();
  const [showLoader, setShowLoader] = useState(false);

  return (
    <View
      style={[styles.container, { aspectRatio: Device.deviceType !== 2 ? "4/2" : width >= height ? "5/1" : "5/2" }]}
    >
      <Image
        source={props.url}
        transition={500}
        style={styles.image}
        onLoadStart={() => setShowLoader(true)}
        onLoadEnd={() => setShowLoader(false)}
      />

      <ActivityIndicator style={styles.loader} color="white" animating={showLoader} />

      <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent"]} locations={[0, 0.33]} style={styles.gradient} />

      <View style={styles.coords}>
        <Text style={styles.text}>
          {Math.abs(props.location.latitude).toFixed(5)}°{props.location.latitude < 0 ? "S" : "N"}
        </Text>

        <Text style={styles.text}>
          {Math.abs(props.location.longitude).toFixed(5)}°{props.location.longitude < 0 ? "W" : "E"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleVars.eaBlue,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loader: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  coords: {
    position: "absolute",
    margin: 12,
    right: 0,
  },
  text: {
    fontFamily: "Helvetica-Monospaced",
    fontSize: 12,
    color: "white",
    textAlign: "right",
  },
});
