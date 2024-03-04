import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Creator } from "./profile";

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

type PlaybookData = {
  title: string;
  sub_title: string;
  image: PlaybookImage;
  creator: Creator;
  destination: Destination;
  locked: boolean;
};

export type PlaybookType = {
  uid: string;
  data: PlaybookData;
};

export default function Playbook() {
  const params = useLocalSearchParams<{ uid: string; title: string }>();
  const { uid, title } = params;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: title,
        }}
      />

      <Text style={{ textAlign: "center" }}>WIP - will show contributor info (name, photo etc.) and Gems</Text>
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
