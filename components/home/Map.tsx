import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { DestinationType } from "context/destination";
import mapStyle from "assets/map-style.json";

type MapProps = {
  region: DestinationType["region"];
};

export default function Map(props: MapProps) {
  return (
    <View style={styles.container}>
      <MapView
        onPanDrag={() => {}} // Hack! - helps smooth dragging on iOS
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        region={props.region}
        showsUserLocation
      />
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
});
