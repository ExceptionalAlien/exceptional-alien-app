import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, View, StyleSheet, Alert } from "react-native";
import * as Network from "expo-network";
import { FlatList } from "react-native-gesture-handler";
import { DestinationType } from "context/destination";
import { PlaybookType } from "app/playbook";
import PlaybookThumb from "components/shared/PlaybookThumb";
import Tab from "./Tab";

type Data = {
  playbook: PlaybookType;
};

type PlaybookSliderProps = {
  destination?: DestinationType;
};

export default function PlaybookSlider(props: PlaybookSliderProps) {
  const [isLoading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const mountedUID = useRef<string | undefined>();

  const getPlaybooks = async (uid?: string) => {
    const route = uid ? uid : "latest"; // Get latest playbooks if destination not included
    const network = await Network.getNetworkStateAsync();

    // Check if device is online
    if (network.isInternetReachable) {
      // Online
      setIsOffline(false);

      try {
        const response = await fetch(`https://www.exceptionalalien.com/api/playbooks/${route}?max=10`);
        const json = await response.json();
        if (!uid || uid === mountedUID.current) setData(json);
      } catch (error) {
        if (!uid || uid === mountedUID.current) {
          setData([]); // Empty
          console.error(error);
          Alert.alert("Error", `Unable to load ${uid ? "destination" : "latest"} Playbooks`);
        }
      } finally {
        if (!uid || uid === mountedUID.current) setLoading(false);
      }
    } else {
      // Offline - hide slider
      if (!uid || uid === mountedUID.current) setLoading(false);
      setIsOffline(true);
    }
  };

  useEffect(() => {
    mountedUID.current = props.destination ? props.destination.uid : undefined; // Used to make sure correct destination shows if user switches during load
    setLoading(true);
    getPlaybooks(props.destination && props.destination.uid);
  }, [props.destination]);

  return (
    <View style={[styles.container, isOffline && { display: "none" }]}>
      <Tab
        title={props.destination ? `${props.destination.name} PLAYBOOKS` : "LATEST TRAVEL PLAYBOOKS"}
        cta="VIEW ALL"
        route={{
          pathname: "/playbooks",
          params: {
            headerTitle: props.destination ? props.destination.name : "Latest Playbooks",
            destinationUID: props.destination?.uid,
          },
        }}
      />

      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" style={styles.loading} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.playbook.uid}
          renderItem={({ item }) => <PlaybookThumb playbook={item.playbook} width={176} titleColor="white" />}
          horizontal
          decelerationRate="fast"
          snapToInterval={184}
          contentContainerStyle={{
            gap: 8,
            paddingLeft: 16,
            paddingRight: 16,
            minWidth: "100%",
          }}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 208,
  },
  loading: {
    flex: 1,
  },
});
