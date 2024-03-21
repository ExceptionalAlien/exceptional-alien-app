import React, { useContext } from "react";
import { StyleSheet, Text, Pressable, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { DestinationType, DestinationContext, DestinationContextType } from "context/destination";
import { pressedDefault, storeData } from "utils/helpers";

type DestinationProps = {
  item: DestinationType;
};

export default function Destination(props: DestinationProps) {
  const router = useRouter();
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
      <Text style={styles.name} allowFontScaling={false}>
        {props.item.name}
      </Text>

      <Image source={require("assets/img/icon-plus.svg")} style={styles.icon} />
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
    lineHeight: 36,
    fontFamily: "Neue-Haas-Grotesk-Med",
    textTransform: "uppercase",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
