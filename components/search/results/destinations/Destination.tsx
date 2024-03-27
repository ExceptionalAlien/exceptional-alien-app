import React, { useContext } from "react";
import { StyleSheet, Text, Pressable, useWindowDimensions, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { DestinationType, DestinationContext, DestinationContextType } from "context/destination";
import { pressedDefault, storeData } from "utils/helpers";
import { styleVars } from "utils/styles";

type DestinationProps = {
  item: DestinationType;
};

const icons = {
  plus: require("assets/img/icon-plus.svg"),
  plusBlue: require("assets/img/icon-plus-blue.svg"),
};

export default function Destination(props: DestinationProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const { setDestination } = useContext<DestinationContextType>(DestinationContext);

  const destinationClick = (destination: DestinationType) => {
    setDestination(destination);
    storeData("destination", destination);
    router.back();
  };

  return (
    <Pressable
      onPress={() => destinationClick(props.item)}
      style={({ pressed }) => [pressedDefault(pressed), styles.container, { maxWidth: width - 64 }]}
    >
      <Text
        style={[styles.name, { color: colorScheme === "light" ? "black" : styleVars.eaBlue }]}
        allowFontScaling={false}
      >
        {props.item.name}
      </Text>

      <Image source={colorScheme === "light" ? icons["plus"] : icons["plusBlue"]} style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  name: {
    fontSize: 36,
    fontFamily: "Neue-Haas-Grotesk-Med",
    textTransform: "uppercase",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
