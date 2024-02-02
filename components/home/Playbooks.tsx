import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";
import { DestinationType } from "context/destination";

type PlaybookData = {
  title: string;
};

type Playbook = {
  uid: string;
  data: PlaybookData;
};

type Data = {
  playbook: Playbook;
};

type PlaybooksProps = {
  destination: DestinationType;
};

export default function Playbooks(props: PlaybooksProps) {
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
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.playbook.uid}
          renderItem={({ item }) => <Text>{item.playbook.data.title}</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
  },
});
