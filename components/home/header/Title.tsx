import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { DestinationType } from "context/destination";
import Destination from "./title/Destination";
import Coords from "./title/Coords";

type TitleProps = {
  destination: DestinationType;
};

export default function Title(props: TitleProps) {
  return (
    <View style={styles.container}>
      <Image source={require("assets/img/logo-icon.svg")} style={styles.logo} />

      {props.destination.name && (
        <View style={styles.text}>
          <Destination name={props.destination.name} />
          <Coords lat={props.destination.lat} lng={props.destination.lng} />
        </View>
      )}
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
  },
  text: {
    rowGap: 2,
  },
});
