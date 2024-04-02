import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Filters() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Link href="../">Dismiss</Link>
      <StatusBar style="light" />
    </View>
  );
}
