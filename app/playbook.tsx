import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  StatusBar,
  Pressable,
  Text,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Network from "expo-network";
import { Ionicons } from "@expo/vector-icons";
import { GemType } from "./gem";
import { CreatorType } from "./profile";
import Header from "components/playbook/Header";
import Gem from "components/playbook/Gem";
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
  description: [{ text: string }];
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
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsloading] = useState(false);
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
        setIsloading(false);
      }
    } else {
      // Offline
      setIsOffline(true);
      setIsloading(false);
    }
  };

  useEffect(() => {
    setIsloading(true);
    getPlaybook();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />

      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "white",
          headerRight: () =>
            playbook && (
              <Pressable onPress={() => null} style={({ pressed }) => pressedDefault(pressed)}>
                <Ionicons name="share-outline" size={28} color="white" />
              </Pressable>
            ),
        }}
      />

      {isOffline ? (
        <View style={styles.offline}>
          <Ionicons name="cloud-offline-outline" size={32} color="white" />
        </View>
      ) : isLoading ? (
        <ActivityIndicator color="white" size="large" style={styles.loader} />
      ) : (
        playbook && (
          <View style={styles.container}>
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
              creator={playbook.data.creator}
            />

            <ScrollView scrollIndicatorInsets={{ right: 1 }}>
              <View style={[styles.wrapper, { paddingBottom: insets.bottom + 16 }]}>
                <Text style={[styles.description, { color: colorScheme === "light" ? "black" : "white" }]}>
                  {playbook.data.description[0].text}
                </Text>

                <Text style={styles.count} allowFontScaling={false}>
                  {playbook.data.slices.length} Gems
                </Text>

                <View style={styles.gems}>
                  {playbook.data.slices.map((item, index) => (
                    <Gem key={index} gem={item.primary.gem} />
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        )
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    gap: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  description: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
  },
  count: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    fontSize: 20,
    color: styleVars.eaBlue,
  },
  gems: {
    gap: 16,
  },
  offline: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: styleVars.eaBlue,
  },
  loader: {
    flex: 1,
    backgroundColor: styleVars.eaBlue,
  },
});
