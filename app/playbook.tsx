import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, ActivityIndicator, StatusBar, Pressable } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Network from "expo-network";
import { Ionicons } from "@expo/vector-icons";
import { GemType } from "./gem";
import { CreatorType } from "./profile";
import Header from "components/playbook/Header";
import { styleVars } from "utils/styles";
import { pressedDefault } from "utils/helpers";

type PlaybookImage = {
  mobile: {
    url: string;
  };
};

type Destination = {
  data: {
    title: string;
  };
};

type Primary = {
  description: [{ text: string }];
  gem: GemType;
  creator: CreatorType;
  playbookCreator: CreatorType;
};

export type Slice = {
  id: string;
  primary: Primary;
};

type PlaybookData = {
  app_title: string;
  sub_title: string;
  image: PlaybookImage;
  creator: CreatorType;
  destination: Destination;
  slices: Slice[];
  locked: boolean;
};

export type PlaybookType = {
  uid: string;
  data: PlaybookData;
};

export default function Playbook() {
  const params = useLocalSearchParams<{ uid: string }>();
  const { uid } = params;
  const [isOffline, setIsOffline] = useState(false);
  const [playbook, setPlaybook] = useState<PlaybookType>();

  const getPlaybook = async () => {
    const network = await Network.getNetworkStateAsync();

    // Check if device is online
    if (network.isInternetReachable) {
      // Online
      try {
        const response = await fetch(`https://www.exceptionalalien.com/api/playbook/${uid}`);
        const json = await response.json();
        setPlaybook(json);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Unable to load Playbook");
      } finally {
        // Nothing to do?
      }
    } else {
      // Offline
      setIsOffline(true);
    }
  };

  useEffect(() => {
    getPlaybook();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "white",
          headerRight: () => (
            <Pressable onPress={() => null} style={({ pressed }) => pressedDefault(pressed)}>
              <Ionicons name="share-outline" size={28} color="white" />
            </Pressable>
          ),
        }}
      />

      {isOffline ? (
        <Ionicons name="cloud-offline-outline" size={32} color={styleVars.eaBlue} />
      ) : !playbook ? (
        <ActivityIndicator color={styleVars.eaBlue} size="large" style={styles.loader} />
      ) : (
        <>
          <Header
            image={playbook.data.image.mobile.url}
            title={
              playbook.data.app_title
                ? playbook.data.app_title
                : playbook.data.destination?.data.title
                ? `${playbook.data.destination?.data.title} with ${playbook.data.creator.data.first_name}${
                    playbook.data.creator.data.last_name
                      ? ` ${playbook.data.creator.data.last_name?.toUpperCase()}`
                      : ""
                  }`
                : `Global with ${playbook.data.creator.data.first_name}${
                    playbook.data.creator.data.last_name
                      ? ` ${playbook.data.creator.data.last_name?.toUpperCase()}`
                      : ""
                  }`
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
