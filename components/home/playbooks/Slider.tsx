import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
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
  destination: DestinationType;
};

export default function Slider(props: SliderProps) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);

  const getPlaybooks = async (uid: string) => {
    try {
      const response = await fetch("https://www.exceptionalalien.com/api/playbooks/" + uid);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPlaybooks(props.destination.uid);
  }, [props.destination]);

  return (
    <View>
      <Tab title={`${props.destination.name} PLAYBOOKS`} />

      {isLoading ? (
        <ActivityIndicator />
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
