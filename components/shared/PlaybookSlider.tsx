import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, View, StyleSheet, Alert } from "react-native";
import * as Network from "expo-network";
import { FlatList } from "react-native-gesture-handler";
import { DestinationType } from "context/destination";
import { PlaybookType } from "app/playbook";
import PlaybookThumb from "components/shared/PlaybookThumb";
import Tab from "./Tab";
import { styleVars } from "utils/styles";

type Data = {
  playbook: PlaybookType;
};

type PlaybookSliderProps = {
  destination?: DestinationType;
  playbooks?: Data[];
  title?: string;
  hideCTA?: boolean;
  hideTab?: boolean;
  blueBg?: boolean;
};

export default function PlaybookSlider(props: PlaybookSliderProps) {
  const [isLoading, setLoading] = useState(false);
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
    if (props.playbooks) {
      // Gem Playbooks
      setData(props.playbooks);
    } else {
      // Destination or latest Playbooks
      mountedUID.current = props.destination ? props.destination.uid : undefined; // Used to make sure correct destination shows if user switches during load
      setLoading(true);
      getPlaybooks(props.destination && props.destination.uid);
    }
  }, [props.destination, props.playbooks]);

  return (
    <View style={{ minHeight: props.hideTab ? 176 : 208, display: isOffline ? "none" : "flex" }}>
      {!props.hideTab && (
        <Tab
          title={
            props.title
              ? props.title
              : props.destination
              ? `${props.destination.name} PLAYBOOKS`
              : "LATEST TRAVEL PLAYBOOKS"
          }
          cta="VIEW ALL"
          route={
            !props.hideCTA
              ? {
                  pathname: "/playbooks",
                  params: {
                    headerTitle: props.destination ? props.destination.name : "Latest Playbooks",
                    destinationUID: props.destination?.uid,
                  },
                }
              : undefined
          }
          blueBg={props.blueBg}
          icon="playbook"
        />
      )}

      {isLoading ? (
        <ActivityIndicator color={props.blueBg ? "#FFFFFF" : styleVars.eaBlue} style={styles.loading} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.playbook.uid}
          renderItem={({ item }) => (
            <PlaybookThumb playbook={item.playbook} width={176} titleColor={props.blueBg ? "white" : undefined} />
          )}
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
  loading: {
    flex: 1,
  },
});
