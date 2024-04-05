import React from "react";
import { View, StyleSheet } from "react-native";
import Tab from "components/shared/Tab";
import OutlineButton from "components/shared/OutlineButton";

export default function Categories() {
  return (
    <View style={styles.container}>
      <Tab title="GEM CATEGORIES" icon="gem" />

      <View style={styles.buttons}>
        <OutlineButton title="Accommodation" category />
        <OutlineButton title="Culture" category />
        <OutlineButton title="Events" category />
        <OutlineButton title="Food & Drink" category />
        <OutlineButton title="Nature" category />
        <OutlineButton title="Neighbourhoods" category />
        <OutlineButton title="Retail" category />
        <OutlineButton title="Wellness" category />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    marginHorizontal: 16,
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
});
