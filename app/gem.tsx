import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Pressable, ActivityIndicator, Alert, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Network from "expo-network";
import { Ionicons } from "@expo/vector-icons";
import { PlaybookType } from "./playbook";
import Title from "components/gem/Title";
import Hero from "components/gem/Hero";
import QuoteSlider from "components/shared/QuoteSlider";
import BigButton from "components/shared/BigButton";
import About from "components/gem/About";
import PlaybookSlider from "components/shared/PlaybookSlider";
import { storeData, getData, pressedDefault } from "utils/helpers";
import { styleVars } from "utils/styles";

type GemData = {
  title: string;
  description: string;
  category: string;
  address: string;
  location: { latitude: number; longitude: number };
  playbooks: [{ playbook: PlaybookType }];
  image: { url: string };
  about: [{ text: string }];
  website: { url: string };
};

export type GemType = {
  uid: string;
  data: GemData;
  hidden: boolean;
};

export default function Gem() {
  const params = useLocalSearchParams<{ uid: string; ref?: string }>();
  const { uid, ref } = params;
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [gem, setGem] = useState<GemType>();
  const [playbooks, setPlaybooks] = useState<[{ playbook: PlaybookType }]>();

  const getGem = async () => {
    const network = await Network.getNetworkStateAsync();

    // Check if device is online
    if (network.isInternetReachable) {
      // Online
      try {
        const response = await fetch(`https://www.exceptionalalien.com/api/gem/${uid}`);
        const json = await response.json();
        setGem(json);

        // Order Playbooks
        const gemPlaybooks = [];
        const unlocked = await getData("unlockedPBs");

        // Locate quote from ref Playbook and position first
        if (ref) {
          for (let i = 0; i < json.data.playbooks.length; i++) {
            let pb = json.data.playbooks[i];
            if (pb.playbook.uid === ref) gemPlaybooks.push(pb);
          }
        }

        // Add all Playbooks excluding ref (if included) and locked
        for (let i = 0; i < json.data.playbooks.length; i++) {
          let pb = json.data.playbooks[i];
          if (
            (pb.playbook.uid !== ref && !pb.playbook.data.locked) ||
            (pb.playbook.uid !== ref && pb.playbook.data.locked && unlocked && unlocked.includes(pb.playbook.uid))
          )
            gemPlaybooks.push(pb);
        }

        setPlaybooks(gemPlaybooks as [{ playbook: PlaybookType }]);
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
    <ScrollView contentContainerStyle={isLoading && { flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Gem",
          headerLargeTitle: false,
          headerRight: () =>
            gem && (
              <View style={styles.headerBar}>
                <Pressable onPress={toggleFav} style={({ pressed }) => pressedDefault(pressed)}>
                  <Ionicons
                    name={isFav ? "heart" : "heart-outline"}
                    size={28}
                    color={isFav ? styleVars.eaRed : colorScheme === "light" ? styleVars.eaBlue : "white"}
                  />
                </Pressable>

                <Pressable
                  onPress={() => alert("Will open share sheet")}
                  style={({ pressed }) => pressedDefault(pressed)}
                >
                  <Ionicons
                    name="share-outline"
                    size={28}
                    color={colorScheme === "light" ? styleVars.eaBlue : "white"}
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
        gem &&
        playbooks &&
        playbooks.length && (
          <View style={{ paddingBottom: insets.bottom + 16 }}>
            <Hero url={gem.data.image.url} />

            <Title
              text={gem.data.title}
              category={gem.data.category}
              description={gem.data.description}
              address={gem.data.address}
            />

            <View style={styles.quotes}>
              <QuoteSlider gem={uid as string} playbooks={playbooks} />
            </View>

            <BigButton
              title="Add to Playbook"
              icon="add-circle-outline"
              alert="Will ask which Playbook to add Gem to or create a new Playbook"
            />

            <About text={gem.data.about[0].text} website={gem.data.website.url} />
            <PlaybookSlider playbooks={playbooks} title="Featured In" hideCTA />
          </View>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    gap: 16,
  },
  quotes: {
    marginTop: 8,
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
