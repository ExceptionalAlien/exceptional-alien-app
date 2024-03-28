import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View, useWindowDimensions } from "react-native";
import * as Device from "expo-device";
import { Image } from "expo-image";
import { styleVars } from "utils/styles";

type HeroProps = {
  url: string;
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
});
