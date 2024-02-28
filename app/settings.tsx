import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Settings",
        }}
      />

      <Text style={{ textAlign: "center" }}>WIP - will show user settings including logout</Text>
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
