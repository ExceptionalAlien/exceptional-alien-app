import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View, useWindowDimensions, Text } from "react-native";
import * as Device from "expo-device";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { CreatorType } from "app/profile";
import CreatorIcon from "components/shared/CreatorIcon";
import { styleVars } from "utils/styles";

type HeroProps = {
  creator: CreatorType;
};

export default function Hero(props: HeroProps) {
  const { width, height } = useWindowDimensions();
  const [showLoader, setShowLoader] = useState(false);

  const code = (first: string, last: string, country: string) => {
    const max = 40;

    var code = `EA<${country ? country : "WWW"}${last ? last.replace(/ /g, "").replace(/'/g, "") : ""}<<${first
      .replace(/ /g, "")
      .replace(/'/g, "")
      .replace(/&/g, "<")}`;

    const loop = max - code.length;

    // Add extra arrows
    for (let i = 0; i < loop; i++) {
      code += "<";
    }

    return code.substring(0, max); // Trim if more than max
  };

  return (
    <View
      style={[styles.container, { aspectRatio: Device.deviceType !== 2 ? "4/3" : width >= height ? "5/1" : "5/2" }]}
    >
      <Image
        source={props.creator.data.hero_image.mobile.url}
        transition={500}
        style={styles.image}
        onLoadStart={() => setShowLoader(true)}
        onLoadEnd={() => setShowLoader(false)}
      />

      <ActivityIndicator style={styles.loader} color="white" animating={showLoader} />

      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent", "transparent", "rgba(0,0,0,0.25)", "rgba(0,0,0,0.5)"]}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={styles.gradient}
      />

      <Text style={styles.code} allowFontScaling={false}>
        {code(props.creator.data.first_name, props.creator.data.last_name, props.creator.data.home_country)}
      </Text>

      <View style={styles.heading}>
        <CreatorIcon creator={props.creator} iconOnly border size="lrg" />

        <View style={styles.text}>
          <Text style={styles.name} allowFontScaling={false}>
            {props.creator.data.first_name}
            {props.creator.data.last_name && ` ${props.creator.data.last_name?.toUpperCase()}`}
          </Text>

          <Text style={styles.title} allowFontScaling={false}>
            {props.creator.data.title}
          </Text>
        </View>
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
  code: {
    fontFamily: "Helvetica-Monospaced",
    fontSize: 12,
    lineHeight: 12,
    position: "absolute",
    margin: 12,
    color: "white",
    textTransform: "uppercase",
    right: 0,
  },
  text: {
    flex: 1,
  },
  heading: {
    position: "absolute",
    bottom: 0,
    margin: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    color: "white",
    fontSize: 24,
  },
  title: {
    fontFamily: "Neue-Haas-Grotesk",
    color: "white",
    fontSize: 18,
    lineHeight: 18,
  },
});
