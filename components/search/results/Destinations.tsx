import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Device from "expo-device";
import destinationsData from "data/destinations.json";
import { Destination } from "context/destination";
import DestinationLink from "./destinations/DestinationLink";

interface DestinationsProps {
  query: string;
}

export default function Destinations(props: DestinationsProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    // Get list of destinations
    const data = JSON.stringify(destinationsData);
    setDestinations(JSON.parse(data));
  }, []);

  return (
    <View style={[styles.container, Device.deviceType === 2 ? styles.tabletContainer : null]}>
      {destinations.map((item, i) => {
        if (
          props.query.length <= 1 ||
          item.name.match(new RegExp(props.query, "gi")) !== null ||
          item.country.match(new RegExp(props.query, "gi")) !== null
        ) {
          return <DestinationLink key={i} item={item} />;
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  tabletContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 20,
  },
});
