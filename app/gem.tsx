import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, ActivityIndicator, Alert } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Network from "expo-network";
import { Ionicons } from "@expo/vector-icons";
import { PlaybookType } from "./playbook";
import Header from "components/gem/Header";
import { storeData, getData } from "utils/helpers";
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
  const [isFav, setIsFav] = useState(false);
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

  const toggleFav = async () => {
    const favs = await getData("favs");
    var updated: string[] = favs ? favs : [];

    if (updated.includes(uid as string)) {
      // Remove
      const index = updated.indexOf(uid as string);
      updated.splice(index, 1);
      setIsFav(false);
    } else {
      // Add
      updated.push(uid as string);
      setIsFav(true);
    }

    storeData("favs", updated);
  };

  const setFav = async () => {
    const favs = await getData("favs");
    setIsFav(favs && favs.includes(uid) ? true : false);
  };

  useEffect(() => {
    setIsloading(true);
    getGem();
    setFav();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          headerLargeTitle: false,
          headerRight: () =>
            gem && (
              <View style={styles.headerNav}>
                <Pressable onPress={toggleFav} style={({ pressed }) => pressedDefault(pressed)}>
                  <Ionicons
                    name={isFav ? "heart" : "heart-outline"}
                    size={28}
                    color={isFav ? styleVars.eaRed : styleVars.eaBlue}
                  />
                </Pressable>

                <Pressable
                  onPress={() => alert("Will open share sheet")}
                  style={({ pressed }) => pressedDefault(pressed)}
                >
                  <Ionicons name="share-outline" size={28} color={styleVars.eaBlue} />
                </Pressable>
              </View>
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
  headerNav: {
    flexDirection: "row",
    gap: 16,
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
