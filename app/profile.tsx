import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  useColorScheme,
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as Network from "expo-network";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PlaybookType } from "./playbook";
import Hero from "components/profile/Hero";
import About from "components/profile/About";
import PlaybookSlider from "components/shared/PlaybookSlider";
import Saved from "components/profile/Saved";
import { styleVars } from "utils/styles";
import { pressedDefault } from "utils/helpers";

type CreatorHero = {
  mobile: {
    url: string;
  };
};

export type CreatorType = {
  uid: string;
  data: {
    first_name: string;
    last_name: string;
    title: string;
    profile_image: { url: string };
    hero_image: CreatorHero;
    description: [{ text: string }];
    short_description: string;
    website: { url: string };
    instagram: string;
    playbooks: [{ playbook: PlaybookType }];
  };
};

export default function Profile() {
  const params = useLocalSearchParams<{ uid?: string }>();
  const { uid } = params;
  const colorScheme = useColorScheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [creator, setCreator] = useState<CreatorType>();

  const getCreator = async () => {
    const network = await Network.getNetworkStateAsync();

    // Check if device is online
    if (network.isInternetReachable) {
      // Online
      try {
        const response = await fetch(`https://www.exceptionalalien.com/api/creator/${uid}`);
        const json = await response.json();
        setCreator(json);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Unable to load contributor");
      } finally {
        setIsloading(false);
      }
    } else {
      // Offline
      setIsOffline(true);
    }
  };

  useEffect(() => {
    if (uid) {
      // Is contributor
      setIsloading(true);
      getCreator();
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={isLoading && { flex: 1 }}>
      <Stack.Screen
        options={{
          title: uid ? "Contributor" : "Profile",
          headerLargeTitle: uid ? false : true,
          headerRight: () =>
            uid ? (
              <Pressable
                onPress={() => alert("Will open share sheet")}
                style={({ pressed }) => pressedDefault(pressed)}
              >
                <Ionicons name="share-outline" size={28} color={colorScheme === "light" ? styleVars.eaBlue : "white"} />
              </Pressable>
            ) : (
              <Pressable onPress={() => router.push("/settings")} style={({ pressed }) => pressedDefault(pressed)}>
                <Ionicons
                  name="settings-outline"
                  size={28}
                  color={colorScheme === "light" ? styleVars.eaBlue : "white"}
                />
              </Pressable>
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
      ) : creator ? (
        <View style={[styles.creator, { paddingBottom: insets.bottom + 16 }]}>
          <Hero creator={creator} />

          <About
            description={creator.data.description}
            website={creator.data.website.url}
            instagram={creator.data.instagram}
          />

          <PlaybookSlider playbooks={creator.data.playbooks} title="Playbooks" hideCTA />
        </View>
      ) : (
        <SafeAreaView>
          <View style={styles.wrapper}>
            <Saved />
          </View>
        </SafeAreaView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  offline: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    flex: 1,
  },
  creator: {
    gap: 16,
  },
  wrapper: {
    marginTop: 16,
  },
});
