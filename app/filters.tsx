import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack, Link } from "expo-router";
import Categories from "components/filters/Categories";
import { styleVars } from "utils/styles";

export default function Filters() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Stack.Screen
        options={{
          title: "Map Filters",
          headerRight: () => (
            <Link
              href="../"
              style={[styles.link, { color: colorScheme === "light" ? styleVars.eaBlue : "white" }]}
              allowFontScaling={false}
            >
              Done
            </Link>
          ),
        }}
      />

      <Categories />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  link: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 16,
  },
});
