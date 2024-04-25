import React, { useState, useEffect, useContext } from "react";
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
import { BookmarksContext, BookmarksContextType } from "context/bookmarks";
import Cover from "components/playbook/Cover";
import Gem from "components/playbook/Gem";
import Tab from "components/shared/Tab";
import BigButton from "components/shared/BigButton";
import Description from "components/playbook/Description";
import { styleVars } from "utils/styles";
import { getData, pressedDefault, storeData, StoredItem } from "utils/helpers";

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
  const { setBookmarks } = useContext<BookmarksContextType>(BookmarksContext);
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [coverHeight, setCoverHeight] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [playbook, setPlaybook] = useState<PlaybookType>();
  const [curators, setCurators] = useState<CreatorType[]>();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

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
        setBookmark(json); // Called again to update with latest data
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

  const getTitle = (pb: PlaybookType) => {
    return pb.data.app_title
      ? pb.data.app_title
      : pb.data.destination.uid && pb.data.destination.data.title
      ? `${pb.data.destination.data.title} with ${pb.data.creator.data.first_name}${
          pb.data.creator.data.last_name ? ` ${pb.data.creator.data.last_name?.toUpperCase()}` : ""
        }`
      : `Global with ${pb.data.creator.data.first_name}${
          pb.data.creator.data.last_name ? ` ${pb.data.creator.data.last_name?.toUpperCase()}` : ""
        }`;
  };

  const getSubtitle = (pb: PlaybookType) => {
    return pb.data.sub_title ? pb.data.sub_title.substring(0, 60) : pb.data.creator.data.title.substring(0, 40);
  };

  const toggleBookmark = async () => {
    const bookmarksData = await getData("bookmarkedPBs");
    const updated: StoredItem[] = bookmarksData ? bookmarksData : [];
    const item = updated.find((item: StoredItem) => item.uid === uid);

    if (item) {
      // Remove
      const index = updated.indexOf(item);
      updated.splice(index, 1);
      setIsBookmark(false);
    } else if (playbook) {
      // Add
      updated.push({
        uid: uid as string,
        title: getTitle(playbook),
        subTitle: getSubtitle(playbook),
        destination: playbook.data.destination.uid,
      });

      setIsBookmark(true);
    }

    storeData("bookmarkedPBs", updated); // Store
    setBookmarks(updated); // Update context
  };

  const setBookmark = async (pb?: PlaybookType) => {
    const bookmarksData = await getData("bookmarkedPBs");

    if (bookmarksData) {
      const item = bookmarksData.find((item: StoredItem) => item.uid === uid);
      setIsBookmark(item ? true : false);

      if (item && pb) {
        // Update stored details (incase outdated title shown)
        const updated: StoredItem[] = bookmarksData;
        const index = bookmarksData.indexOf(item);

        updated[index] = {
          uid: uid as string,
          title: getTitle(pb),
          subTitle: getSubtitle(pb),
          destination: pb.data.destination.uid,
        };

        storeData("bookmarkedPBs", updated); // Store
        setBookmarks(updated); // Update context
      }
    }
  };

  useEffect(() => {
    setIsloading(true);
    setBookmark();

    setTimeout(() => {
      getPlaybook();
    }, 500); // Hack! - Pause to allow header color change to stick on iOS
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Stack.Screen
        options={{
          title: "Playbook",
          headerTransparent: true,
          headerLargeTitle: false,
          headerStyle: {
            backgroundColor: `rgba(34,32,193,${scrollOffset})`,
          },
          headerTintColor: playbook || colorScheme === "dark" ? "white" : styleVars.eaBlue,
          headerRight: () => (
            <View style={styles.headerBar}>
              <Pressable onPress={toggleBookmark} style={({ pressed }) => pressedDefault(pressed)}>
                <Ionicons
                  name={isBookmark ? "bookmark" : "bookmark-outline"}
                  size={28}
                  color={playbook || colorScheme === "dark" ? "white" : styleVars.eaBlue}
                />
              </Pressable>

              <Pressable
                onPress={() => alert("Will open share sheet")}
                style={({ pressed }) => pressedDefault(pressed)}
              >
                <Ionicons
                  name="share-outline"
                  size={28}
                  color={playbook || colorScheme === "dark" ? "white" : styleVars.eaBlue}
                />
              </Pressable>
            </View>
          ),
        }}
      />

      {isOffline ? (
        <View style={styles.offline}>
          <Ionicons
            name="cloud-offline-outline"
            size={40}
            color={colorScheme === "light" ? styleVars.eaBlue : "white"}
          />
        </View>
      ) : isLoading ? (
        <ActivityIndicator
          color={colorScheme === "light" ? styleVars.eaBlue : "white"}
          size="large"
          style={styles.loader}
        />
      ) : (
        playbook && (
          <>
            <View style={scrollOffset === 0 && !isScrolling && { zIndex: 1 }}>
              <Cover
                image={playbook.data.image.mobile.url}
                title={getTitle(playbook)}
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
                    backgroundColor: colorScheme === "light" ? "white" : "black",
                    display: coverHeight ? "flex" : "none",
                  },
                ]}
                onTouchStart={() => setIsScrolling(true)}
                onTouchEnd={() => setIsScrolling(false)}
              >
                <Description
                  text={playbook.data.description[0].text}
                  curators={curators}
                  locked={isUnlocked ? false : true}
                />

                <Tab
                  title={`${playbook.data.slices.length} GEMS`}
                  cta={playbook.data.destination.uid && playbook.data.destination.data.title}
                  destination={playbook.data.destination.uid}
                  icon="gem"
                />

                <View style={styles.gems}>
                  {playbook.data.slices.map((item, index) => (
                    <Gem
                      key={index}
                      gem={item.primary.gem}
                      hidden={isUnlocked ? false : true}
                      playbook={playbook.uid}
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
                  icon="map-outline"
                  disabled={isUnlocked ? false : true}
                  home
                  playbook={playbook}
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
  headerBar: {
    flexDirection: "row",
    gap: 16,
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
