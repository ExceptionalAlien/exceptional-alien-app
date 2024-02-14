import { useState, useEffect } from "react";
import { SafeAreaView, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { PlaybookType } from "./playbook";
import PlaybookThumb from "components/shared/PlaybookThumb";

type Data = {
  playbook: PlaybookType;
};

export default function Profile() {
  const params = useLocalSearchParams<{ headerTitle: string; destinationUID: string }>();
  const { headerTitle, destinationUID } = params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);

  const getPlaybooks = async (uid?: string) => {
    const route = uid ? uid : "latest"; // Get latest playbooks if destination not included

    try {
      const response = await fetch(`https://www.exceptionalalien.com/api/playbooks/${route}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      setData([]); // Empty
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPlaybooks(destinationUID);
  }, []);

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: headerTitle,
        }}
      />

      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" style={styles.loading} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.playbook.uid}
          renderItem={({ item }) => <PlaybookThumb playbook={item.playbook} />}
          contentContainerStyle={{ gap: 12, paddingLeft: 16, paddingRight: 16 }}
        />
      )}
    </SafeAreaView>
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
