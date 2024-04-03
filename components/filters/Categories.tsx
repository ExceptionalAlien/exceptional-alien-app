import React from "react";
import { View, StyleSheet } from "react-native";
import Tab from "components/shared/Tab";

export default function Categories() {
  return (
    <View style={styles.container}>
      <Tab title="GEM CATEGORIES" icon="gem" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
