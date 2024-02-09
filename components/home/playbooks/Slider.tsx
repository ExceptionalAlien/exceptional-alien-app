import { useEffect, useState, useRef } from "react";
import { ActivityIndicator, FlatList, View, StyleSheet } from "react-native";
import { DestinationType } from "context/destination";
import Playbook from "./Playbook";
import { PlaybookData } from "./Playbook";
import Tab from "./Tab";

type Playbook = {
  uid: string;
  data: PlaybookData;
};

type Data = {
  playbook: Playbook;
};

type SliderProps = {
  title: string;
  destination?: DestinationType;
};

export default function Slider(props: SliderProps) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const mountedUID = useRef<string | undefined>();

  const getPlaybooks = async (uid?: string) => {
    const route = uid ? uid : "latest"; // Get latest playbooks if destination not included

    try {
      const response = await fetch(`https://www.exceptionalalien.com/api/playbooks/${route}?max=12`);
      const json = await response.json();
      if (!uid || uid === mountedUID.current) setData(json);
    } catch (error) {
      if (!uid || uid === mountedUID.current) console.error(error);
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
      <Tab title={props.title} />

      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" style={styles.loading} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.playbook.uid}
          renderItem={({ item }) => <Playbook data={item.playbook.data} />}
          horizontal={true}
          contentContainerStyle={{ gap: 12, paddingLeft: 16, paddingRight: 16 }}
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
