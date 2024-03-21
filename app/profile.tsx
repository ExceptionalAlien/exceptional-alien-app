import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styleVars } from "utils/styles";
import { pressedDefault } from "utils/helpers";

export type CreatorType = {
  uid: string;
  data: {
    first_name: string;
    last_name: string;
    title: string;
    profile_image: { url: string };
  };
};

export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Profile",
          headerRight: () => (
            <Pressable onPress={() => router.push("/settings")} style={({ pressed }) => pressedDefault(pressed)}>
              <Ionicons name="settings-outline" size={28} color={styleVars.eaBlue} />
            </Pressable>
          ),
        }}
      />

      <Text style={{ textAlign: "center" }}>WIP - will show user info (name, photo etc.) and Playbooks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
