import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";
import { PlaybookType } from "./playbook";

type GemData = {
  title: string;
  description: string;
  category: string;
  address: string;
  location: { latitude: number; longitude: number };
  playbooks: [{ playbook: PlaybookType }];
  image: { url: string };
};

export type GemType = {
  uid: string;
  data: GemData;
  hidden: boolean;
};

export default function Gem() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Gem",
        }}
      />

      <Text style={{ textAlign: "center" }}>WIP - will show full Gem details</Text>
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
