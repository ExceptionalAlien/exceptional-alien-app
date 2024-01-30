import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Destination } from "context/destination";
import destinationsData from "data/destinations.json";

interface DestinationsProps {
  query: string;
}

export default function Destinations(props: DestinationsProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const data = JSON.stringify(destinationsData);
    setDestinations(JSON.parse(data));
  }, []);

  return (
    <View style={styles.container}>
      {destinations.map((item, i) => (
        <Text key={i} style={styles.text}>
          {item.name}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  text: {
    fontSize: 36,
    fontFamily: "Neue-Haas-Grotesk-Med",
  },
});
