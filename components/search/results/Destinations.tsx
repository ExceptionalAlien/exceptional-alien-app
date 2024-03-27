import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Device from "expo-device";
import destinationsData from "data/destinations.json";
import { DestinationType } from "context/destination";
import Destination from "./destinations/Destination";

type DestinationsProps = {
  query: string;
};

export default function Destinations(props: DestinationsProps) {
  const [destinations, setDestinations] = useState<DestinationType[]>([]);

  useEffect(() => {
    // Get list of destinations
    const data = JSON.stringify(destinationsData);
    setDestinations(JSON.parse(data));
  }, []);

  return (
    <View style={[styles.container, Device.deviceType === 2 && styles.tabletContainer]}>
      {destinations.map((item, i) => {
        if (
          (props.query.length <= 1 && item.trending) ||
          (props.query.length > 1 && item.name.match(new RegExp(props.query, "gi")) !== null) ||
          (props.query.length > 1 && item.keywords?.match(new RegExp(props.query, "gi")) !== null)
        )
          return <Destination key={i} item={item} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 4,
  },
  tabletContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 20,
  },
});
