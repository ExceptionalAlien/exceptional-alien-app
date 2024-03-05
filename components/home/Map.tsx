import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import * as Network from "expo-network";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE, Marker, Region } from "react-native-maps";
import { DestinationType } from "context/destination";
import { GemType } from "app/gem";
import Controls from "./map/Controls";
import HiddenMarker from "./map/HiddenMarker";
import HiddenGemsDetected from "./map/HiddenGemsDetected";
import mapStyle from "assets/map-style.json";
import { detectDestination } from "utils/detect-destination";
import { styleVars } from "utils/styles";

type MapProps = {
  destination: DestinationType;
  setDestination: (destination: DestinationType) => void;
  selectedGem: GemType | undefined;
  setSelectedGem: React.Dispatch<React.SetStateAction<GemType | undefined>>;
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
  Hidden: require("assets/img/markers/hidden.png"),
};

export default function Map(props: MapProps) {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GemType[]>([]);
  const [visibleHiddenGems, setVisibleHiddenGems] = useState<string[]>([]);
  const mountedID = useRef<string | undefined>();
  const mapRef = useRef<MapView>(null);
  const hiddenGems = useRef<GemType[]>([]);

  const pressed = (gem: GemType) => {
    props.setSelectedGem(props.selectedGem?.uid === gem.uid ? undefined : gem);
  };

  const getGems = async (id: string) => {
    const network = await Network.getNetworkStateAsync();

    // Check if device is online
    if (network.isInternetReachable) {
      // Online
      try {
        const response = await fetch(`https://www.exceptionalalien.com/api/gems/${id}`);
        const json = await response.json();

        if (id === mountedID.current) {
          const gems = [];
          hiddenGems.current = []; // Reset

          // Loop all returned Gems
          for (let i = 0; i < json.length; i++) {
            let gem = json[i];
            let hiddenPBCount = 0;

            // Loop Playbooks Gem is featured in
            for (let i = 0; i < gem.data.playbooks.length; i++) {
              if (gem.data.playbooks[i].playbook.data.locked) hiddenPBCount++; // Playbook is locked
            }

            if (gem.data.playbooks.length && hiddenPBCount === gem.data.playbooks.length) {
              // Gem is only featured in locked Playbooks
              gem.hidden = true;
              hiddenGems.current.push(gem);
            }

            if (gem.data.location.latitude && gem.data.location.longitude) gems.push(gem);
          }

          setData(gems);
        }
      } catch (error) {
        if (id === mountedID.current) {
          console.error(error);
          Alert.alert("Error", `Unable to load Gems`);
        }
      } finally {
        if (id === mountedID.current) setIsLoading(false);
      }
    } else {
      // Offline - do not load Gems
      if (id === mountedID.current) setIsLoading(false);
    }
  };

  const setBounds = () => {
    const coords = [
      { latitude: props.destination.bounds!.latitudeStart, longitude: props.destination.bounds!.longitudeStart },
      { latitude: props.destination.bounds!.latitudeEnd, longitude: props.destination.bounds!.longitudeEnd },
    ];

    mapRef.current?.fitToCoordinates(coords, {
      edgePadding: { top: 160, left: 48, bottom: 64, right: 48 },
    });
  };

  const regionChanged = (region: Region) => {
    // Detect if location is within a destination
    const destination = detectDestination(
      region.latitude,
      region.longitude,
      region.latitudeDelta,
      region.longitudeDelta
    );

    if (destination.uid && destination.uid !== props.destination.uid) props.setDestination(destination);

    // Detect hidden Gems
    const gems: string[] = [];

    mapRef.current
      ?.getMapBoundaries()
      .then((bounds) => {
        for (let i = 0; i < hiddenGems.current.length; i++) {
          let lat = hiddenGems.current[i].data.location.latitude;
          let lng = hiddenGems.current[i].data.location.longitude;

          if (
            lat >= bounds.southWest.latitude &&
            lat <= bounds.northEast.latitude &&
            lng >= bounds.southWest.longitude &&
            lng <= bounds.northEast.longitude &&
            region.latitudeDelta <= 0.03 &&
            region.longitudeDelta <= 0.03
          ) {
            gems.push(hiddenGems.current[i].uid); // Gem is within map bounds and map is zoomed in
          }
        }

        //if (gems.length && !visibleHiddenGems.length)
        //alert("Hidden Gems detected");
        setVisibleHiddenGems(gems);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    mountedID.current = props.destination.id; // Used to make sure correct destination gems show if user switches during load
    setIsLoading(true);
    setData([]); // Empty
    props.setSelectedGem(undefined); // Reset
    if (!props.destination.region) setBounds(); // Only if destination isn't device location
    getGems(props.destination.id);
  }, [props.destination]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        onPanDrag={() => props.setSelectedGem(undefined)} // Hack! - helps smooth dragging on iOS
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        region={props.destination.region ? props.destination.region : undefined}
        toolbarEnabled={false}
        onRegionChangeComplete={(region) => regionChanged(region)}
        showsUserLocation
        onPress={(e) => {
          if (e.nativeEvent.action !== "marker-press") props.setSelectedGem(undefined);
        }}
      >
        {data.map((item, index) => {
          if (!item.hidden) {
            return (
              <Marker
                key={index}
                coordinate={item.data.location}
                zIndex={props.selectedGem?.uid === item.uid ? 1 : undefined}
                icon={
                  item.hidden
                    ? icons["Hidden"]
                    : props.selectedGem?.uid === item.uid
                    ? icons[`${item.data.category.replace(/ /g, "").replace("&", "And")}Selected` as keyof typeof icons]
                    : icons[item.data.category.replace(/ /g, "").replace("&", "And") as keyof typeof icons]
                }
                tracksViewChanges={false}
                onPress={() => pressed(item)}
              />
            );
          } else if (item.hidden && visibleHiddenGems.includes(item.uid)) {
            return (
              <Marker key={index} coordinate={item.data.location} onPress={() => pressed(item)}>
                <HiddenMarker />
              </Marker>
            );
          }
        })}
      </MapView>

      <HiddenGemsDetected />
      <Controls setDestination={props.setDestination} setIsLoading={setIsLoading} />

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
