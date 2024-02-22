import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { DestinationType } from "context/destination";
import { GemType } from "app/gem";
import GemMarker from "./map/GemMarker";
import mapStyle from "assets/map-style.json";
import { styleVars } from "utils/styles";

type MapProps = {
  destination: DestinationType;
};

export default function Map(props: MapProps) {
  const insets = useSafeAreaInsets();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<GemType[]>([]);
  const mountedID = useRef<string | undefined>();

  const getGems = async (id: string) => {
    try {
      const response = await fetch(`https://www.exceptionalalien.com/api/gems/${id}`);
      const json = await response.json();
      if (id === mountedID.current) setData(json);
    } catch (error) {
      if (id === mountedID.current) console.error(error);
    } finally {
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
        showsUserLocation
      >
        {data.map((item, index) => {
          if (item.data.location.latitude && item.data.location.longitude) {
            return <GemMarker key={index} marker={item} />;
          }
        })}
      </MapView>

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
