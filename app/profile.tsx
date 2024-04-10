import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, useColorScheme, ScrollView, View, ActivityIndicator, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as Network from "expo-network";
import Ionicons from "@expo/vector-icons/Ionicons";
import Hero from "components/profile/Hero";
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
            !uid && (
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
      ) : (
        creator && (
          <View style={{ paddingBottom: insets.bottom + 16 }}>
            <Hero creator={creator} />
          </View>
        )
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
});
