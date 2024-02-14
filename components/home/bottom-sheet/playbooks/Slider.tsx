import { useEffect, useState, useRef } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DestinationType } from "context/destination";
import { PlaybookType } from "app/playbook";
import PlaybookThumb from "components/shared/PlaybookThumb";
import Tab from "./Tab";

type Data = {
  playbook: PlaybookType;
};

type SliderProps = {
  destination?: DestinationType;
};

export default function Slider(props: SliderProps) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const mountedUID = useRef<string | undefined>();

  const getPlaybooks = async (uid?: string) => {
    const route = uid ? uid : "latest"; // Get latest playbooks if destination not included

    try {
      const response = await fetch(`https://www.exceptionalalien.com/api/playbooks/${route}?max=10`);
      const json = await response.json();
      if (!uid || uid === mountedUID.current) setData(json);
    } catch (error) {
      if (!uid || uid === mountedUID.current) {
        setData([]); // Empty
        console.error(error);
      }
    } finally {
      if (!uid || uid === mountedUID.current) setLoading(false);
    }
  };

  useEffect(() => {
    mountedUID.current = props.destination ? props.destination.uid : undefined; // Used to make sure correct destination shows if user switches during load
    setLoading(true);
    getPlaybooks(props.destination && props.destination.uid);
  }, [props.destination]);

  return (
    <View style={styles.container}>
      <Tab
        title={props.destination ? `${props.destination.name} PLAYBOOKS` : "LATEST TRAVEL PLAYBOOKS"}
        pageTitle={props.destination ? props.destination.name : "Latest Playbooks"}
        destinationUID={props.destination && props.destination.uid}
      />

      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" style={styles.loading} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.playbook.uid}
          renderItem={({ item }) => <PlaybookThumb playbook={item.playbook} />}
          horizontal
          contentContainerStyle={{ gap: 12, paddingLeft: 16, paddingRight: 16 }}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
  },
  loading: {
    flex: 1,
  },
});
