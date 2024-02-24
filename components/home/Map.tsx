import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import * as Network from "expo-network";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { DestinationType } from "context/destination";
import { GemType } from "app/gem";
import Controls from "./map/Controls";
import mapStyle from "assets/map-style.json";
import { styleVars } from "utils/styles";

type MapProps = {
  destination: DestinationType;
};

const icons = {
  FoodAndDrink: require("assets/img/markers/food-and-drink.png"),
  FoodAndDrinkSelected: require("assets/img/markers/food-and-drink-selected.png"),
  Culture: require("assets/img/markers/culture.png"),
  CultureSelected: require("assets/img/markers/culture-selected.png"),
  Nature: require("assets/img/markers/nature.png"),
  NatureSelected: require("assets/img/markers/nature-selected.png"),
  Retail: require("assets/img/markers/retail.png"),
  RetailSelected: require("assets/img/markers/retail-selected.png"),
  Neighbourhoods: require("assets/img/markers/neighbourhoods.png"),
  NeighbourhoodsSelected: require("assets/img/markers/neighbourhoods-selected.png"),
  Wellness: require("assets/img/markers/wellness.png"),
  WellnessSelected: require("assets/img/markers/wellness-selected.png"),
  Events: require("assets/img/markers/events.png"),
  EventsSelected: require("assets/img/markers/events-selected.png"),
  Accommodation: require("assets/img/markers/accommodation.png"),
  AccommodationSelected: require("assets/img/markers/accommodation-selected.png"),
};

export default function Map(props: MapProps) {
  const insets = useSafeAreaInsets();
  const [isLoading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<string>();
  const [data, setData] = useState<GemType[]>([]);
  const mountedID = useRef<string | undefined>();

  const pressed = (uid: string) => {
    setSelectedMarker(uid);
  };

  const getGems = async (id: string) => {
    const network = await Network.getNetworkStateAsync();

    // Check if device is online
    if (network.isInternetReachable) {
      // Online
      try {
        const response = await fetch(`https://www.exceptionalalien.com/api/gems/${id}`);
        const json = await response.json();
        if (id === mountedID.current) setData(json);
      } catch (error) {
        if (id === mountedID.current) {
          console.error(error);
          Alert.alert("Error", `Unable to load Gems`);
        }
      } finally {
        if (id === mountedID.current) setLoading(false);
      }
    } else {
      // Offline - do not load Gems
      if (id === mountedID.current) setLoading(false);
    }
  };

  useEffect(() => {
    mountedID.current = props.destination.id; // Used to make sure correct destination gems show if user switches during load
    setLoading(true);
    setData([]); // Empty
    getGems(props.destination.id);
  }, [props.destination]);

  return (
    <View style={styles.container}>
      <MapView
        onPanDrag={() => {}} // Hack! - helps smooth dragging on iOS
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        region={props.destination.region}
        toolbarEnabled={false}
        showsUserLocation
      >
        {data.map((item) => {
          if (item.data.location.latitude && item.data.location.longitude) {
            return (
              <Marker
                key={item.uid}
                coordinate={item.data.location}
                icon={
                  selectedMarker === item.uid
                    ? icons[`${item.data.category.replace(/ /g, "").replace("&", "And")}Selected` as keyof typeof icons]
                    : icons[item.data.category.replace(/ /g, "").replace("&", "And") as keyof typeof icons]
                }
                tracksViewChanges={false}
                onPress={() => pressed(item.uid)}
              />
            );
          }
        })}
      </MapView>

      <Controls />

      {isLoading && (
        <ActivityIndicator
          color={styleVars.eaBlue}
          style={[styles.loading, { paddingTop: insets.top + 60 /* Header height */ }]}
          size={"large"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "65%",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "65%",
  },
});
