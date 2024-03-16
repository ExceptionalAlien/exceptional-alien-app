import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator, Text, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Device from "expo-device";
import { styleVars } from "utils/styles";

type HeaderProps = {
  image: string;
  title: string;
};

export default function Header(props: HeaderProps) {
  const { width, height } = useWindowDimensions();
  const [showLoader, setShowLoader] = useState(false);

  return (
    <View style={{ aspectRatio: Device.deviceType !== 2 ? "4/3" : width >= height ? "5/2" : "5/3" }}>
      <View style={styles.bg} />

      <Image
        source={props.image}
        style={styles.image}
        transition={500}
        onLoadStart={() => setShowLoader(true)}
        onLoadEnd={() => setShowLoader(false)}
      />

      <ActivityIndicator style={styles.loader} color="white" animating={showLoader} />

      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent", "transparent", "rgba(0,0,0,0.25)", "rgba(0,0,0,0.5)"]}
        locations={[0, 0.4, 0.6, 0.8, 1]}
        style={styles.gradient}
      />

      <Text style={[styles.text, { fontSize: Device.deviceType === 2 ? 48 : 30 }]} allowFontScaling={false}>
        {props.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
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
  text: {
    position: "absolute",
    fontFamily: "Neue-Haas-Grotesk-Med",
    color: "white",
    bottom: 0,
    padding: 12,
  },
});
