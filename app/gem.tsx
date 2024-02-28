import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Stack } from "expo-router";

type GemData = {
  title: string;
  description: string;
  category: string;
  address: string;
  location: { latitude: number; longitude: number };
};

export type GemType = {
  uid: string;
  data: GemData;
};

export default function Gem() {
  return (
    <View>
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
