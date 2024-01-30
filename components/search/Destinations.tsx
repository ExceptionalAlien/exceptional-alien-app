import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import destinationsData from "data/destinations.json";
import { Destination, DestinationContext, DestinationContextType } from "context/destination";
import { pressedDefault } from "utils/helpers";

interface DestinationsProps {
  query: string;
}

export default function Destinations(props: DestinationsProps) {
  const router = useRouter();
  const { setDestination } = useContext<DestinationContextType>(DestinationContext);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    // Get list of destinations
    const data = JSON.stringify(destinationsData);
    setDestinations(JSON.parse(data));
  }, []);

  const destinationClick = (destination: Destination) => {
    setDestination(destination);
    router.back();
  };

  return (
    <View style={styles.container}>
      {destinations.map((item, i) => (
        <Pressable
          key={i}
          onPress={() => destinationClick(item)}
          style={({ pressed }) => [pressedDefault(pressed), styles.destination]}
        >
          <Text style={styles.name} allowFontScaling={false}>
            {item.name}
          </Text>
          <Image source={require("assets/img/icon-plus.svg")} style={styles.plus} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  destination: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  name: {
    fontSize: 36,
    fontFamily: "Neue-Haas-Grotesk-Med",
    textTransform: "uppercase",
  },
  plus: {
    width: 24,
    height: 24,
  },
});
