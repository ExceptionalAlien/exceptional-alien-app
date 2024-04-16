import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, Pressable, ActivityIndicator, Alert, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Network from "expo-network";
import { Ionicons } from "@expo/vector-icons";
import { FavsContext, FavsContextType } from "context/favs";
import { PlaybookType } from "./playbook";
import Title from "components/gem/Title";
import Hero from "components/gem/Hero";
import QuoteSlider from "components/shared/QuoteSlider";
import BigButton from "components/shared/BigButton";
import About from "components/gem/About";
import PlaybookSlider from "components/shared/PlaybookSlider";
import { storeData, getData, pressedDefault, StoredItem } from "utils/helpers";
import { styleVars } from "utils/styles";

type GemImage = {
  seo: {
    url: string;
  };
};

type GemDestination = {
  data: { title: string };
};

type GemData = {
  title: string;
  description: string;
  category: string;
  address: string;
  location: { latitude: number; longitude: number };
  playbooks: [{ playbook: PlaybookType }];
  image: GemImage;
  about: [{ text: string }];
  website: { url: string };
  destination: GemDestination;
};

export type GemType = {
  uid: string;
  data: GemData;
  hidden: boolean;
  fav: boolean;
};

export default function Gem() {
  const params = useLocalSearchParams<{ uid: string; ref?: string }>();
  const { uid, ref } = params;
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const { setFavs } = useContext<FavsContextType>(FavsContext);
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

        setPlaybooks(gemPlaybooks.length ? (gemPlaybooks as [{ playbook: PlaybookType }]) : undefined);
        setFav(json); // Called again to update with latest data
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
    const favsData = await getData("favGems");
    const updated: StoredItem[] = favsData ? favsData : [];
    const item = updated.find((item: StoredItem) => item.uid === uid);

    if (item) {
      // Remove
      const index = updated.indexOf(item);
      updated.splice(index, 1);
      setIsFav(false);
    } else if (gem) {
      // Add
      updated.push({
        uid: uid as string,
        title: gem.data.title,
        subTitle: gem.data.description,
        destination: gem.data.destination.data.title,
      });

      setIsFav(true);
    }

    storeData("favGems", updated); // Store
    setFavs(updated); // Update context
  };

  const setFav = async (g?: GemType) => {
    const favsData = await getData("favGems");

    if (favsData) {
      const item = favsData.find((item: StoredItem) => item.uid === uid);
      setIsFav(item ? true : false);

      if (item && g) {
        // Update stored details (incase outdated title shown)
        const updated: StoredItem[] = favsData;
        const index = favsData.indexOf(item);

        updated[index] = {
          uid: uid as string,
          title: g.data.title,
          subTitle: g.data.description,
          destination: g.data.destination.data.title,
        };

        storeData("favGems", updated); // Store
        setFavs(updated); // Update context
      }
    }
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
        gem && (
          <View style={{ paddingBottom: insets.bottom + 16 }}>
            <Hero url={gem.data.image.seo.url} location={gem.data.location} />

            <Title
              text={gem.data.title}
              category={gem.data.category}
              description={gem.data.description}
              address={gem.data.address}
            />

            {playbooks && (
              <View style={styles.quotes}>
                <QuoteSlider gem={uid as string} playbooks={playbooks} />
              </View>
            )}

            <BigButton
              title="Add to Playbook"
              icon="add-circle-outline"
              alert="Will ask which Playbook to add Gem to or create a new Playbook"
            />

            <About text={gem.data.about[0].text} website={gem.data.website.url} />
            {playbooks && <PlaybookSlider playbooks={playbooks} title="Featured In" hideCTA />}
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
