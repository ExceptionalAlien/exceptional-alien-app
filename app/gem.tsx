import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, ActivityIndicator, Alert } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Network from "expo-network";
import { Ionicons } from "@expo/vector-icons";
import { PlaybookType } from "./playbook";
import Header from "components/gem/Header";
import { pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type GemData = {
  title: string;
  description: string;
  category: string;
  address: string;
  location: { latitude: number; longitude: number };
  playbooks: [{ playbook: PlaybookType }];
  image: { url: string };
};

export type GemType = {
  uid: string;
  data: GemData;
  hidden: boolean;
};

export default function Gem() {
  const params = useLocalSearchParams<{ uid: string }>();
  const { uid } = params;
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [gem, setGem] = useState<GemType>();

  const getGem = async () => {
    const network = await Network.getNetworkStateAsync();

    // Check if device is online
    if (network.isInternetReachable) {
      // Online
      try {
        const response = await fetch(`https://www.exceptionalalien.com/api/gem/${uid}`);
        const json = await response.json();
        setGem(json);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Unable to load Gem");
      } finally {
        setIsloading(false);
      }
    } else {
      // Offline
      setIsOffline(true);
    }
  };

  useEffect(() => {
    setIsloading(true);
    getGem();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          headerLargeTitle: false,
          headerRight: () =>
            gem && (
              <Pressable
                onPress={() => alert("Will open share sheet")}
                style={({ pressed }) => pressedDefault(pressed)}
              >
                <Ionicons name="share-outline" size={28} color={styleVars.eaBlue} />
              </Pressable>
            ),
        }}
      />

      {isOffline ? (
        <View style={styles.offline}>
          <Ionicons name="cloud-offline-outline" size={40} color={styleVars.eaBlue} />
        </View>
      ) : isLoading ? (
        <ActivityIndicator color={styleVars.eaBlue} size="large" style={styles.loader} />
      ) : (
        gem && (
          <>
            <Header title={gem.data.title} category={gem.data.category} description={gem.data.description} />
          </>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  offline: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    flex: 1,
  },
});
