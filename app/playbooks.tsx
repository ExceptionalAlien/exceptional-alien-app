import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View, Alert } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { PlaybookType } from "./playbook";
import PlaybookThumb from "components/shared/PlaybookThumb";
import { styleVars } from "utils/styles";

type Data = {
  playbook: PlaybookType;
};

export default function Profile() {
  const params = useLocalSearchParams<{ headerTitle: string; destinationUID: string }>();
  const { headerTitle, destinationUID } = params;
  const headerHeight = useHeaderHeight();
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
      Alert.alert("Error", "Unable to load Playbooks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPlaybooks(destinationUID);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <Stack.Screen
        options={{
          title: headerTitle,
        }}
      />

      {isLoading ? (
        <ActivityIndicator color={styleVars.eaBlue} style={styles.loading} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.playbook.uid}
          renderItem={({ item }) => <PlaybookThumb playbook={item.playbook} />}
          columnWrapperStyle={{ gap: 8 }}
          contentContainerStyle={{
            gap: 16,
            padding: 16,
          }}
          numColumns={2}
          contentInsetAdjustmentBehavior="automatic"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
  },
});
