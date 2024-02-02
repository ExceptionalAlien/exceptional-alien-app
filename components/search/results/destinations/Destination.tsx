import { useContext } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { DestinationType, DestinationContext, DestinationContextType } from "context/destination";
import { pressedDefault } from "utils/helpers";

type DestinationProps = {
  item: DestinationType;
};

export default function Destination(props: DestinationProps) {
  const router = useRouter();
  const { setDestination } = useContext<DestinationContextType>(DestinationContext);

  const destinationClick = (destination: DestinationType) => {
    setDestination(destination);
    router.back();
  };

  return (
    <Pressable
      onPress={() => destinationClick(props.item)}
      style={({ pressed }) => [pressedDefault(pressed), styles.container]}
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
    fontFamily: "Neue-Haas-Grotesk-Med",
    textTransform: "uppercase",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
