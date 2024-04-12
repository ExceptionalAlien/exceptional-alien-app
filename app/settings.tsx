import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, SafeAreaView, View } from "react-native";
import { Stack } from "expo-router";
import { SettingsContext, SettingsContextType } from "context/settings";
import Toggle from "components/shared/Toggle";
import Tab from "components/shared/Tab";
import { getData } from "utils/helpers";

export default function Settings() {
  const { setSettings } = useContext<SettingsContextType>(SettingsContext);

  useEffect(() => {
    async () => {
      const settingsData = await getData("settings");
      if (settingsData) setSettings(settingsData); // Init
    };
  }, []);

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: "Settings",
        }}
      />

      <SafeAreaView>
        <View style={styles.container}>
          <Tab title="MAP SETTINGS" />
          <Toggle label="Detect hidden Gems" icon="radar" setting="detectGems" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
});
