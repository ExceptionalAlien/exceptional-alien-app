import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { DestinationType } from "context/destination";
import Destination from "./title/Destination";
import Coords from "./title/Coords";
import { pressedDefault } from "utils/helpers";

type TitleProps = {
  destination: DestinationType;
};

export default function Title(props: TitleProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push({ pathname: "/search", params: { destinationsOnly: true } })}
        style={({ pressed }) => pressedDefault(pressed)}
        hitSlop={12}
      >
        <Image source={require("assets/img/logo-icon.svg")} style={styles.logo} />
      </Pressable>

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
