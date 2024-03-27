import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Stack } from "expo-router";

export default function Profile() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Settings",
        }}
      />

      <Text style={{ textAlign: "center", color: colorScheme === "light" ? "black" : "white" }}>
        WIP - will show user settings including logout
      </Text>
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
