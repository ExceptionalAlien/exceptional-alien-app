import React from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { GemType } from "app/gem";
import PlaybookSlider from "components/shared/PlaybookSlider";
import { styleVars } from "utils/styles";

type HiddenGemProps = {
  selectedGem: GemType;
};

export default function HiddenGem(props: HiddenGemProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("assets/img/icon-hidden.svg")} style={styles.icon} />

        <View style={styles.text}>
          <Text style={styles.title} allowFontScaling={false}>
            Hidden Gem
          </Text>

          <Text
            style={[styles.description, { color: colorScheme === "light" ? styleVars.eaGrey : styleVars.eaLightGrey }]}
            allowFontScaling={false}
          >
            This hidden Gem is included in the Playbooks below. Unlock a Playbook to reveal the Gem.
          </Text>
        </View>
      </View>

      <PlaybookSlider playbooks={props.selectedGem.data.playbooks} hideTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  header: {
    marginHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  icon: {
    width: 48,
    height: 48,
  },
  text: {
    flex: 1,
  },
  title: {
    fontFamily: "Neue-Haas-Grotesk-Med",
    color: styleVars.eaBlue,
    fontSize: 20,
  },
  description: {
    fontFamily: "Neue-Haas-Grotesk",
    fontSize: 14,
  },
});
