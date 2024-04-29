import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import * as Network from "expo-network";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE, Marker, Region } from "react-native-maps";
import { DestinationType } from "context/destination";
import { GemsContext, GemsContextType } from "context/gems";
import { FiltersContext, FiltersContextType } from "context/filters";
import { FavsContext, FavsContextType } from "context/favs";
import { SettingsContext, SettingsContextType } from "context/settings";
import { GemType } from "app/gem";
import Controls from "./map/Controls";
import HiddenGemsDetected from "./map/HiddenGemsDetected";
import Banner from "./map/Banner";
import Action from "./map/Action";
import mapStyle from "assets/map-style.json";
import { detectDestination } from "utils/detect-destination";
import { getData, StoredItem } from "utils/helpers";
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
  FoodAndDrinkFav: require("assets/img/markers/food-and-drink-fav.png"),
  FoodAndDrinkSelectedFav: require("assets/img/markers/food-and-drink-selected-fav.png"),
  Culture: require("assets/img/markers/culture.png"),
  CultureSelected: require("assets/img/markers/culture-selected.png"),
  CultureFav: require("assets/img/markers/culture-fav.png"),
  CultureSelectedFav: require("assets/img/markers/culture-selected-fav.png"),
  Nature: require("assets/img/markers/nature.png"),
  NatureSelected: require("assets/img/markers/nature-selected.png"),
  NatureFav: require("assets/img/markers/nature-fav.png"),
  NatureSelectedFav: require("assets/img/markers/nature-selected-fav.png"),
  Retail: require("assets/img/markers/retail.png"),
  RetailSelected: require("assets/img/markers/retail-selected.png"),
  RetailFav: require("assets/img/markers/retail-fav.png"),
  RetailSelectedFav: require("assets/img/markers/retail-selected-fav.png"),
  Neighbourhoods: require("assets/img/markers/neighbourhoods.png"),
  NeighbourhoodsSelected: require("assets/img/markers/neighbourhoods-selected.png"),
  NeighbourhoodsFav: require("assets/img/markers/neighbourhoods-fav.png"),
  NeighbourhoodsSelectedFav: require("assets/img/markers/neighbourhoods-selected-fav.png"),
  Wellness: require("assets/img/markers/wellness.png"),
  WellnessSelected: require("assets/img/markers/wellness-selected.png"),
  WellnessFav: require("assets/img/markers/wellness-fav.png"),
  WellnessSelectedFav: require("assets/img/markers/wellness-selected-fav.png"),
  Events: require("assets/img/markers/events.png"),
  EventsSelected: require("assets/img/markers/events-selected.png"),
  EventsFav: require("assets/img/markers/events-fav.png"),
  EventsSelectedFav: require("assets/img/markers/events-selected-fav.png"),
  Accommodation: require("assets/img/markers/accommodation.png"),
  AccommodationSelected: require("assets/img/markers/accommodation-selected.png"),
  AccommodationFav: require("assets/img/markers/accommodation-fav.png"),
  AccommodationSelectedFav: require("assets/img/markers/accommodation-selected-fav.png"),
  Hidden: require("assets/img/markers/hidden.png"),
  HiddenSelected: require("assets/img/markers/hidden-selected.png"),
};

export default function Map(props: MapProps) {
  const insets = useSafeAreaInsets();
  const { filters } = useContext<FiltersContextType>(FiltersContext);
  const { favs, setFavs } = useContext<FavsContextType>(FavsContext);
  const { settings, setSettings } = useContext<SettingsContextType>(SettingsContext);
  const { gems, setGems } = useContext<GemsContextType>(GemsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<GemType[]>([]);
  const [markerCount, setMarkerCount] = useState<number | undefined>();
  const [visibleHiddenGems, setVisibleHiddenGems] = useState<string[]>([]);
  const [showingPBGems, setShowingPBGems] = useState(false);
  const mountedID = useRef<string | undefined>();
  const mapRef = useRef<MapView>(null);
  const hiddenGems = useRef<GemType[]>([]);

  const pressed = (gem: GemType) => {
    props.setSelectedGem(props.selectedGem?.uid === gem.uid ? undefined : gem);
  };

  const getGems = async (id: string) => {
    setIsLoading(true);
    const network = await Network.getNetworkStateAsync();

    // Check if device is online
    if (network.isInternetReachable) {
      // Online
      try {
        const response = await fetch(`https://www.exceptionalalien.com/api/gems/${id}`);
        const unlocked = await getData("unlockedPBs");
        const favsData = await getData("favGems");
        setFavs(favsData); // Init
        const settingsData = await getData("settings");
        if (settingsData) setSettings(settingsData); // Init
        const json = await response.json();

        if (id === mountedID.current) {
          const availableGems = [];

          // Loop all returned Gems
          for (let i = 0; i < json.length; i++) {
            let gem = json[i];
            let hiddenPBCount = 0;

            // Loop Playbooks Gem is featured in
            for (let i = 0; i < gem.data.playbooks.length; i++) {
              if (
                (!unlocked && gem.data.playbooks[i].playbook.uid && gem.data.playbooks[i].playbook.data.locked) ||
                (unlocked &&
                  gem.data.playbooks[i].playbook.uid &&
                  gem.data.playbooks[i].playbook.data.locked &&
                  !unlocked.includes(gem.data.playbooks[i].playbook.uid))
              )
                hiddenPBCount++; // Playbook is locked
            }

            if (gem.data.playbooks.length && hiddenPBCount === gem.data.playbooks.length) {
              // Gem is only featured in locked Playbooks
              gem.hidden = true;
              hiddenGems.current.push(gem);
            }

            if (gem.data.location.latitude && gem.data.location.longitude) availableGems.push(gem);
          }

          setData(availableGems);
          detectHiddenGems();
          autoZoom(availableGems, 12, id); // Zoom out if no Gems visible on map
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

  const autoZoom = (allGems: GemType[], zoom: number, id: string) => {
    var visibleCount = 0;

    mapRef.current
      ?.getMapBoundaries()
      .then((bounds) => {
        // Loop Gems and check if currently visible on map
        for (let i = 0; i < allGems.length; i++) {
          let gem = allGems[i];
          let lat = gem.data.location.latitude;
          let lng = gem.data.location.longitude;

          if (
            lat >= bounds.southWest.latitude &&
            lat <= bounds.northEast.latitude &&
            lng >= bounds.southWest.longitude &&
            lng <= bounds.northEast.longitude
          )
            visibleCount++;
        }

        if (!visibleCount && zoom) {
          mapRef.current?.animateCamera({ zoom: zoom });

          setTimeout(() => {
            if (id === mountedID.current && !showingPBGems) autoZoom(allGems, 0, id); // See if Gems no visible
          }, 750);
        } else if (!visibleCount) {
          setBounds(); // Show all Gems
        }
      })
      .catch((err) => console.log(err));
  };

  const setBounds = () => {
    const coords = [
      { latitude: props.destination.bounds!.latitudeStart, longitude: props.destination.bounds!.longitudeStart },
      { latitude: props.destination.bounds!.latitudeEnd, longitude: props.destination.bounds!.longitudeEnd },
    ];

    mapRef.current?.fitToCoordinates(coords, {
      edgePadding: { top: 0, left: 40, bottom: 56, right: 40 },
    });
  };

  const detectHiddenGems = async () => {
    const hidden: string[] = [];
    const coords = await mapRef?.current?.getCamera();

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
            coords?.zoom &&
            coords.zoom >= 14
          ) {
            hidden.push(hiddenGems.current[i].uid); // Gem is within map bounds and map is zoomed in
          }
        }

        setVisibleHiddenGems(hidden);
      })
      .catch((err) => console.log(err));
  };

  const regionChanged = (region: Region) => {
    if (!showingPBGems) {
      // Detect if location is within a destination
      const destination = detectDestination(
        region.latitude,
        region.longitude,
        region.latitudeDelta,
        region.longitudeDelta
      );

      if (destination.uid && destination.uid !== props.destination.uid) {
        props.setDestination(destination);
      } else {
        detectHiddenGems();
      }
    }
  };

  useEffect(() => {
    setIsLoading(false);
    mountedID.current = props.destination.id; // Used to make sure correct destination gems show if user switches during load
    setData([]); // Empty
    setGems([]); // Clear
    props.setSelectedGem(undefined); // Reset
    hiddenGems.current = []; // Reset
    if (!props.destination.region) setBounds(); // Only if destination isn't device location
    if (props.destination.id) getGems(props.destination.id);
  }, [props.destination]);

  useEffect(() => {
    var timeout: undefined | ReturnType<typeof setTimeout>;

    if (gems?.length) {
      props.setSelectedGem(undefined); // Reset
      hiddenGems.current = []; // Reset
      setData(gems);
      setShowingPBGems(true);

      // Show all markers on map
      timeout = setTimeout(() => {
        mapRef.current?.fitToElements({
          edgePadding: { top: 32, left: 40, bottom: 56, right: 40 },
        });
      }, 500); // Wait for markers to render
    }

    return () => clearTimeout(timeout);
  }, [gems]);

  useEffect(() => {
    const markers: any = mapRef?.current?.props.children;
    var count = 0;

    for (let i = 0; i < markers.length; i++) {
      if (markers[i]) count++; // Check if defined
    }

    setMarkerCount(count);
  }, [mapRef?.current?.props.children, filters]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        onPanDrag={() => props.setSelectedGem(undefined)} // Hack! - helps smooth dragging on iOS
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        region={props.destination.region ? props.destination.region : undefined} // Will use Gem boundaries if device location not provided
        toolbarEnabled={false}
        onRegionChangeComplete={(region) => regionChanged(region)}
        showsUserLocation
        onPress={(e) => {
          if (e.nativeEvent.action !== "marker-press") props.setSelectedGem(undefined);
        }}
        mapPadding={{ top: 160, left: 8, bottom: 8, right: 8 }}
      >
        {data.map((item, index) => {
          if (
            (!item.hidden && !filters.categories.length && !filters.favsOnly && !filters.myPlaybooksOnly) ||
            (!item.hidden &&
              filters.categories.length &&
              filters.categories.includes(item.data.category) &&
              !filters.favsOnly &&
              !filters.myPlaybooksOnly) ||
            (!item.hidden &&
              !filters.categories.length &&
              filters.favsOnly &&
              favs?.find((gem: StoredItem) => gem.uid === item.uid) &&
              !filters.myPlaybooksOnly) ||
            (!item.hidden &&
              filters.categories.length &&
              filters.categories.includes(item.data.category) &&
              filters.favsOnly &&
              favs?.find((gem: StoredItem) => gem.uid === item.uid) &&
              !filters.myPlaybooksOnly) ||
            (item.hidden &&
              settings.detectGems &&
              visibleHiddenGems.includes(item.uid) &&
              !filters.categories.length &&
              !filters.favsOnly &&
              !filters.myPlaybooksOnly)
          ) {
            return (
              <Marker
                key={gems ? item.uid : index}
                coordinate={item.data.location}
                zIndex={props.selectedGem?.uid === item.uid ? 1 : undefined}
                icon={
                  item.hidden && props.selectedGem?.uid === item.uid
                    ? icons["HiddenSelected"]
                    : item.hidden
                    ? icons["Hidden"]
                    : props.selectedGem?.uid === item.uid
                    ? icons[
                        `${item.data.category.replace(/ /g, "").replace("&", "And")}Selected${
                          favs?.find((gem: StoredItem) => gem.uid === item.uid) ? "Fav" : ""
                        }` as keyof typeof icons
                      ]
                    : icons[
                        `${item.data.category.replace(/ /g, "").replace("&", "And")}${
                          favs?.find((gem: StoredItem) => gem.uid === item.uid) ? "Fav" : ""
                        }` as keyof typeof icons
                      ]
                }
                tracksViewChanges={false}
                onPress={() => pressed(item)}
              />
            );
          }
        })}
      </MapView>

      <Action text="Select a destination" visible={!props.destination.uid ? true : false} icon />
      <Action text="Show all Gems" visible={showingPBGems ? true : false} />
      <Banner text="No Gems found" visible={!props.destination.uid || (data.length && !markerCount) ? true : false} />
      <HiddenGemsDetected hiddenGemCount={visibleHiddenGems.length} />

      <Controls
        destination={props.destination}
        setDestination={props.setDestination}
        setIsLoading={setIsLoading}
        mapRef={mapRef}
      />

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
