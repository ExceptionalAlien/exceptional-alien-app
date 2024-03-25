import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  StatusBar,
  Pressable,
  ScrollView,
  useColorScheme,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Network from "expo-network";
import { BlurView } from "expo-blur";
import * as Device from "expo-device";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { GemType } from "./gem";
import { CreatorType } from "./profile";
import Cover from "components/playbook/Cover";
import Gem from "components/playbook/Gem";
import Tab from "components/shared/Tab";
import BigButton from "components/shared/BigButton";
import Description from "components/playbook/Description";
import { styleVars } from "utils/styles";
import { getData, pressedDefault } from "utils/helpers";

type PlaybookImage = {
  mobile: {
    url: string;
  };
};

type Destination = {
  uid: string;
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
  const { width, height } = useWindowDimensions();
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [coverHeight, setCoverHeight] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [playbook, setPlaybook] = useState<PlaybookType>();
  const [curators, setCurators] = useState<CreatorType[]>();
  const [isUnlocked, setIsUnlocked] = useState(false);

  const getPlaybook = async () => {
    const network = await Network.getNetworkStateAsync();

    // Check if device is online
    if (network.isInternetReachable) {
      // Online
      try {
        const unlocked = await getData("unlockedPBs");
        const response = await fetch(`https://www.exceptionalalien.com/api/playbook/${uid}`);
        const json = await response.json();
        setIsUnlocked(
          (unlocked && json.data.locked && !unlocked.includes(uid)) || (!unlocked && json.data.locked) ? false : true
        );
        setPlaybook(json);

        // Detect if Gems selected by other Creator/s
        const creators: CreatorType[] = [];

        for (let i = 0; i < json.data.slices.length; i++) {
          let creator = json.data.slices[i].primary.creator;
          if (creator.data && !creators.some((item) => item.uid === creator.uid)) creators.push(creator);
        }

        setCurators(creators);
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
    setScrollOffset(percentage >= 100 ? 1 : percentage / 100);
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
            backgroundColor: `rgba(34,32,193,${isLoading ? 1 : scrollOffset})`,
          },
          headerTintColor: "white",
          headerRight: () =>
            playbook && (
              <Pressable
                onPress={() => alert("Will open share sheet")}
                style={({ pressed }) => pressedDefault(pressed)}
              >
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
            <View style={scrollOffset === 0 && !isScrolling && { zIndex: 1 }}>
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
            </View>

            {Platform.OS === "ios" && (
              <BlurView
                style={[
                  styles.blur,
                  { aspectRatio: Device.deviceType !== 2 ? "4/3" : width >= height ? "3/1" : "5/3" },
                ]}
                intensity={scrollOffset * 100}
              />
            )}

            <ScrollView onScroll={scrolling} scrollEventThrottle={16} onScrollEndDrag={() => setIsScrolling(false)}>
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
                onTouchStart={() => setIsScrolling(true)}
              >
                <Description
                  text={playbook.data.description[0].text}
                  curators={curators}
                  locked={isUnlocked ? false : true}
                />

                <Tab
                  title={`${playbook.data.slices.length} GEMS`}
                  cta={playbook.data.destination.data?.title}
                  destination={playbook.data.destination.uid}
                  icon="gem"
                />

                <View style={styles.gems}>
                  {playbook.data.slices.map((item, index) => (
                    <Gem
                      key={index}
                      gem={item.primary.gem}
                      hidden={isUnlocked ? false : true}
                      creator={
                        curators && item.primary.creator.data && curators.length !== 1
                          ? item.primary.creator
                          : undefined
                      }
                    />
                  ))}
                </View>

                <BigButton
                  title="View on Map"
                  icon="map"
                  disabled={isUnlocked ? false : true}
                  alert="Will filter map and only show Gems included in this Playbook"
                />
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
  blur: {
    position: "absolute",
    width: "100%",
  },
  wrapper: {
    paddingTop: 16,
  },
  gems: {
    gap: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    marginTop: 4,
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
