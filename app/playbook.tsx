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
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Network from "expo-network";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { GemType } from "./gem";
import { CreatorType } from "./profile";
import Cover from "components/playbook/Cover";
import Gem from "components/playbook/Gem";
import Tab from "components/shared/Tab";
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
  const headerHeight = useHeaderHeight();
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [coverHeight, setCoverHeight] = useState(0);
  const [headerBgOpacity, setHeaderBgOpacity] = useState(0);
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
    }
  };

  const scrolling = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Set header bg opacity
    const percentage = Math.floor((e.nativeEvent.contentOffset.y / (coverHeight - headerHeight)) * 100);
    setHeaderBgOpacity(percentage >= 100 ? 1 : percentage / 100);
  };

  useEffect(() => {
    setIsloading(true);
    getPlaybook();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
          headerLargeTitle: false,
          headerStyle: {
            backgroundColor: `rgba(34,32,193,${isLoading ? 1 : headerBgOpacity})`,
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
          <Ionicons name="cloud-offline-outline" size={40} color={styleVars.eaBlue} />
        </View>
      ) : isLoading ? (
        <ActivityIndicator color={styleVars.eaBlue} size="large" style={styles.loader} />
      ) : (
        playbook && (
          <>
            <Cover
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
              setCoverHeight={setCoverHeight}
            />

            <ScrollView onScroll={scrolling} scrollEventThrottle={16}>
              <View
                style={[
                  styles.wrapper,
                  {
                    marginTop: coverHeight,
                    paddingBottom: insets.bottom + 16,
                    backgroundColor: colorScheme === "light" ? "white" : styleVars.eaGrey,
                    display: coverHeight ? "flex" : "none",
                  },
                ]}
              >
                <Text style={[styles.description, { color: colorScheme === "light" ? "black" : "white" }]}>
                  {playbook.data.description[0].text}
                </Text>

                <Tab title={`${playbook.data.slices.length} GEMS`} />

                <View style={styles.gems}>
                  {playbook.data.slices.map((item, index) => (
                    <Gem key={index} gem={item.primary.gem} />
                  ))}
                </View>
              </View>
            </ScrollView>
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
  wrapper: {
    gap: 16,
    paddingTop: 16,
  },
  description: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
    marginHorizontal: 16,
  },
  gems: {
    gap: 16,
    marginHorizontal: 16,
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
